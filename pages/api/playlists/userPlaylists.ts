/* eslint-disable no-await-in-loop */
import { NextApiResponse, NextApiRequest } from "next";
import cookie from "cookie";

import { spotifyFetcher } from "../../../lib/fetcher";
import { sliceBaseUrl } from "../../../lib/spotify";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  if (!token) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        const accessTokenCookie = cookie.serialize(
          "SPOTIFY_ACCESS_TOKEN",
          newAccessToken,
          {
            httpOnly: true,
            maxAge: 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          }
        );

        res.setHeader("Set-Cookie", accessTokenCookie);
        token = newAccessToken;
      }
    } catch (err) {
      console.warn(err);
      // probably should redirct to the login page or an error page before login
    }
  }

  let moreData = true;
  let endpoint = "/me/playlists";
  let playlists = [];

  try {
    while (moreData) {
      const playlistData = await spotifyFetcher(endpoint, token);

      playlists = [...playlists, ...playlistData.items];

      if (playlistData.next) {
        endpoint = sliceBaseUrl(playlistData.next);
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
