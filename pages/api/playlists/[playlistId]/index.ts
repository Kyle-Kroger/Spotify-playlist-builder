/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { sliceBaseUrl } from "../../../../lib/spotify";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const detailQueryParams = `market=es&fields=name,external_urls(spotify),images,owner(display_name, id),snapshot_id`;
  const detailEndpoint = `/playlists/${playlistId}?${detailQueryParams}`;

  const trackQueryParams = `market=es&fields=items(track(name,id,linked_from,uri,duration_ms,href,album(name,id,href,images),artists(name,href))),next`;
  let tracksEndpoint = `/playlists/${playlistId}/tracks?${trackQueryParams}`;

  let moreData = true;
  let tracks = [];
  let playlistData = {};

  try {
    const playlistDetails = await spotifyFetcher(detailEndpoint, token);
    playlistData = { ...playlistData, ...playlistDetails };
    while (moreData) {
      const playlistTracks = await spotifyFetcher(tracksEndpoint, token);

      let items = playlistTracks.items.map((item) => {
        if (item.track === null) {
          return null;
        }
        const uri =
          item.track.linked_from !== undefined
            ? item.track.linked_from.uri
            : item.track.uri;
        return {
          id: item.track.id,
          uri,
          name: item.track.name,
          duration: item.track.duration_ms.toString(),
          images: item.track.album.images,
          artists: item.track.artists,
          firstArtist: item.track.artists[0].name,
          albumId: item.track.album.id,
          albumName: item.track.album.name,
        };
      });

      items = items.filter((item) => item !== null);

      tracks = [...tracks, ...items];

      if (playlistTracks.next) {
        tracksEndpoint = sliceBaseUrl(playlistTracks.next);
      } else {
        moreData = false;
      }
    }
    playlistData = { ...playlistData, tracks };
    res.send(playlistData);
  } catch (err) {
    console.warn(err);
  }
};