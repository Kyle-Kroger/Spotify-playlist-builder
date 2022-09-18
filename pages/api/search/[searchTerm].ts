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

  offset = !offset ? "0" : offset;
  const searchQueryParams = `q=${searchTerm}&type=${type}&market=es&offset=${offset}&limit=50`;
  const searchEndpoint = `/search?${searchQueryParams}`;

  let searchResults = {};

  try {
    // need to make sure that type is track, artist, or album
    if (type !== "track" && type !== "artist" && type !== "album") {
      throw new Error("Please enter a type of either track, artist or album");
    }

    if (searchTerm === " ") {
      throw new Error("Please enter in a search term");
    }

    const data = await spotifyFetcher(searchEndpoint, token);
    const key = `${type}s`;
    let items = [];

    if (key === "tracks") {
      items = data[key].items.map((item) => {
        return {
          name: item.name,
          duration: item.duration_ms,
          id: item.id,
          uri: item.uri,
          isPlayable: item.is_playable,
          type: item.type,
          artists: item.artists,
          albumId: item.album.id,
          albumName: item.album.name,
          images: item.album.images,
        };
      });
    }

    if (key === "artists") {
      items = data[key].items.map((item) => {
        return {
          name: item.name,
          id: item.id,
          type: item.type,
          images: item.images,
        };
      });
    }

    if (key === "albums") {
      items = data[key].items.map((item) => {
        return {
          name: item.name,
          artists: item.artists,
          id: item.id,
          type: item.type,
          images: item.images,
        };
      });
    }

    searchResults = {
      items,
      next: data[key].next,
      prev: data[key].previous,
    };
  } catch (err) {
    console.warn(err.message);
  }
  res.send(searchResults);
};
