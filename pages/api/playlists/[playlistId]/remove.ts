import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a delete request to remove
  if (req.method !== "DELETE") {
    res.status(405).send({ message: "Only DELETE requests allowed" });
    return;
  }

  const { playlistId } = req.query;
  const { trackUri, snapshotId } = req.body;

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const endpoint = `/playlists/${playlistId}/tracks`;
  let response;

  try {
    const data = { tracks: [{ uri: trackUri }], snapshot_id: snapshotId };
    // response should be a snapshot id
    response = await spotifyFetcher(endpoint, token, "DELETE", data);
  } catch (err) {
    console.warn(err);
    // better error handling for when the request fails
  }
  res.send(response);
};
