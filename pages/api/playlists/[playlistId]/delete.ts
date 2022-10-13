import { NextApiRequest, NextApiResponse } from "next";
import { refreshAccessToken } from "../../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a delete request to remove
  if (req.method !== "DELETE") {
    res.status(405).send({ message: "Only DELETE requests allowed" });
    return;
  }

  const { playlistId } = req.query;

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const endpoint = `/playlists/${playlistId}/followers`;
  let response;

  try {
    // attempt to delete a playlist (unfollow it)
    // doesn't send a response?
    response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }
  } catch (err) {
    console.warn(err);
    // better error handling for when the request fails
  }
  res.send(response);
};
