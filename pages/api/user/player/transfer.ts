import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  if (req.method === "PUT") {
    const { deviceId } = req.body;
    try {
      await spotifyFetcher(`/me/player`, token, "PUT", {
        device_ids: [deviceId],
      });

      res.status(200).send({ success: true });
    } catch (err) {
      res.send({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
};
