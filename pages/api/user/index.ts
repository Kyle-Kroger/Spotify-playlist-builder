import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  try {
    const currentUser = await spotifyFetcher("/me", token);

    // error handling for bad requests

    res.send(currentUser);
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
};
