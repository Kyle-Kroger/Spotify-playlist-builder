import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  res.send(data);
};
