/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchTerm, type } = req.query;
  let { offset } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  // need to make sure that the searchType is track, artist, or album

  offset = !offset ? "0" : offset;
  const searchQueryParams = `q=${searchTerm}&type=${type}&market=es&offset=${offset}&limit=50`;
  const searchEndpoint = `/search?${searchQueryParams}`;

  let searchResults = {};

  try {
    const data = await spotifyFetcher(searchEndpoint, token);
    searchResults = data;

    // send different stuff back depending if it was a track, artist, album
  } catch (err) {
    console.log(err);
  }

  res.send(searchResults);
};
