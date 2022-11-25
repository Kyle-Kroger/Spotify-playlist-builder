import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  try {
    const playbackState = await spotifyFetcher("/me/player", token);

    if (typeof playbackState === "undefined") {
      throw new Error("playback state is unavalible");
    } else {
      res.send({ ...playbackState, success: true });
    }
  } catch (err) {
    res.send({ success: false, error: err.message });
  }
};
