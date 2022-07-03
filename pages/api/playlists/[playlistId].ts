/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { sliceBaseUrl } from "../../../lib/spotify";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const detailQueryParams = `market=es&fields=name,images,owner(display_name)`;
  const detailEndpoint = `/playlists/${playlistId}?${detailQueryParams}`;

  const trackQueryParams = `market=es&fields=items(track(name,duration_ms,href,album(name,href,images),artists(name,href))),next`;
  let tracksEndpoint = `/playlists/${playlistId}/tracks?${trackQueryParams}`;

  let moreData = true;
  let tracks = [];
  let playlistData = {};

  try {
    const playlistDetails = await spotifyFetcher(detailEndpoint, token);
    playlistData = { ...playlistData, ...playlistDetails };
    while (moreData) {
      const playlistTracks = await spotifyFetcher(tracksEndpoint, token);

      tracks = [...tracks, ...playlistTracks.items];

      if (playlistTracks.next) {
        tracksEndpoint = sliceBaseUrl(playlistTracks.next);
      } else {
        moreData = false;
      }
    }
    playlistData = { ...playlistData, tracks };
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
  res.send(playlistData);
};
