/* eslint-disable no-await-in-loop */
import { NextApiResponse, NextApiRequest } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { sliceBaseUrl } from "../../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;
  let moreData = true;
  let url = "/me/playlists";
  let playlists = [];

  try {
    while (moreData) {
      const playlistData = await spotifyFetcher(url, token);

      playlists = [...playlists, ...playlistData.items];

      if (playlistData.next) {
        url = sliceBaseUrl(playlistData.next);
      } else {
        moreData = false;
      }
    }
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
  res.send(playlists);
};
