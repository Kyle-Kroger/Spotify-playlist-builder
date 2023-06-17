/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { sliceBaseUrl } from "../../../lib/spotify";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { albumId } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  let albumData = {};

  // get album data
  const albumEndpoint = `/albums/${albumId}?market=es`;
  let albumTracksEndpoint = `/albums/${albumId}/tracks?market=es`;
  let moreData = true;
  let tracks = [];

  try {
    const albumInfo = await spotifyFetcher(albumEndpoint, token);
    albumData = {
      ...albumData,
      artists: albumInfo.artists,
      href: albumInfo.href,
      externalUrl: albumInfo.external_urls.spotify,
      id: albumInfo.id,
      uri: albumInfo.uri,
      images: albumInfo.images,
      name: albumInfo.name,
      total_tracks: albumInfo.total_tracks,
    };

    // get album tracks. looping in case there is more than 50 tracks
    while (moreData) {
      const albumTracks = await spotifyFetcher(albumTracksEndpoint, token);

      const items = albumTracks.items.map((item) => {
        return { ...item, duration: item.duration_ms };
      });

      tracks = [...tracks, ...items];

      if (albumTracks.next) {
        albumTracksEndpoint = sliceBaseUrl(albumTracks.next);
      } else {
        moreData = false;
      }
    }
    albumData = { ...albumData, tracks };
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
  res.send(albumData);
};
