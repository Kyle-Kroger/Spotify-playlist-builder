import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a post request to add
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { playlistId } = req.query;
  const { trackUri } = req.body;

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const endpoint = `/playlists/${playlistId}/tracks`;
  let response;

  try {
    const data = { uris: [trackUri] };
    console.log(playlistId, trackUri);
    // response should be a snapshot id
    response = await spotifyFetcher(endpoint, token, "POST", data);
  } catch (err) {
    console.warn(err);
    // better error handling for when the request fails
  }
  res.send(response);
};
