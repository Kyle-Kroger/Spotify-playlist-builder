import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a post request to createNew
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { userId, name, description, isPrivate } = req.body;

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const endpoint = `/users/${userId}/playlists`;
  let response;

  try {
    const bodyData = { name, description, public: !isPrivate };
    response = await spotifyFetcher(endpoint, token, "POST", bodyData);
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
  res.send(response);
};
