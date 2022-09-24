import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a put request for reordering
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed" });
    return;
  }

  const { playlistId } = req.query;
  const { trackStartIndex, trackEndIndex, snapshotId } = req.body;

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const endpoint = `/playlists/${playlistId}/tracks`;
  let response;

  try {
    // response should be a snapshot id if code is 200
    response = await spotifyFetcher(endpoint, token, "PUT", {
      range_start: trackStartIndex,
      insert_before: trackEndIndex,
      snapshot_id: snapshotId,
    });
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }

  res.send(response);
};
