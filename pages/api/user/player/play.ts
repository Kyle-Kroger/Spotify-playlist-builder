import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  if (req.method === "PUT") {
    const { playlistUri, uri } = req.body;
    try {
      // No uri, just play existing song
      // No playlist uri just play the uri (playlist uri can be an album uri)
      // Both playlist uri and song uri then play play song in playlist
      if (typeof uri === "undefined") {
        await spotifyFetcher("/me/player/play", token, "PUT");
      } else if (typeof playlistUri === "undefined") {
        const bodyData = {
          uris: [uri],
          position_ms: 0,
        };
        await spotifyFetcher("/me/player/play", token, "PUT", bodyData);
      } else {
        const bodyData = {
          context_uri: playlistUri,
          offset: { uri },
          position_ms: 0,
        };
        await spotifyFetcher("/me/player/play", token, "PUT", bodyData);
      }

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
