import { NextApiResponse, NextApiRequest } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  const data = await spotifyFetcher("/me/playlists", token);

  res.send(data);
};
