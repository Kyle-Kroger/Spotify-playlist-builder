/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../lib/fetcher";
import { sliceBaseUrl } from "../../../lib/spotify";
import { refreshAccessToken } from "../../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistId } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  let artistData = {};

  // get artist data
  const artistEndpoint = `/artists/${artistId}`;
  let artistAlbumsEndpoint = `/artists/${artistId}/albums?include_groups=single%2Calbum&market=es`;
  let moreData = true;
  let albums = [];

  try {
    const artistInfo = await spotifyFetcher(artistEndpoint, token);
    artistData = { ...artistData, ...artistInfo };

    // get artist albums
    while (moreData) {
      const artistAlbums = await spotifyFetcher(artistAlbumsEndpoint, token);

      albums = [...albums, ...artistAlbums.items];

      if (artistAlbums.next) {
        artistAlbumsEndpoint = sliceBaseUrl(artistAlbums.next);
      } else {
        moreData = false;
      }
    }
    artistData = { ...artistData, albums };
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
  res.send(artistData);
};
