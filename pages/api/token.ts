import { NextApiRequest, NextApiResponse } from "next";
import { refreshAccessToken } from "../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // method must be a post request to createNew
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  if (!token) {
    token = await refreshAccessToken(token, refreshToken, res);
  }

  res.send({ token });
};
