/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import { NextApiRequest, NextApiResponse } from "next";

import { spotifyFetcher } from "../../../../lib/fetcher";
import dbConnect from "../../../../lib/mongodb";
import { sliceBaseUrl } from "../../../../lib/spotify";
import { ITrackTag } from "../../../../lib/types";
import { refreshAccessToken } from "../../../../lib/utils";
import Tag from "../../../../models/Tag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = req.cookies;
  let { SPOTIFY_ACCESS_TOKEN: token } = req.cookies;
  const { MONGODB_URI } = process.env;

  // refresh if needed
  token = await refreshAccessToken(token, refreshToken, res);

  const detailQueryParams = `market=es&fields=name,uri,external_urls(spotify),images,owner(display_name, id),snapshot_id`;
  const detailEndpoint = `/playlists/${playlistId}?${detailQueryParams}`;

  const trackQueryParams = `market=es&fields=items(track(name,id,linked_from,uri,duration_ms,href,album(name,id,href,images),artists(name,href))),next`;
  let tracksEndpoint = `/playlists/${playlistId}/tracks?${trackQueryParams}`;

  let moreData = true;
  let tracks = [];
  let playlistData = {};

  try {
    const playlistDetails = await spotifyFetcher(detailEndpoint, token);
    playlistData = { ...playlistData, ...playlistDetails };

    // get tag data from mongo
    console.log(`Connecting to DB with ${MONGODB_URI}`);
    await dbConnect();
    console.log("Connected to DB just fine");

    const playlistTags = await Tag.find({ playlistId });
    const trackTagMap = new Map();

    // tags exist on playlist
    if (playlistTags.length > 0) {
      playlistTags.forEach((tag) => {
        // create a tag object
        const tagObj: ITrackTag = {
          name: tag.name,
          id: tag._id.toString(),
          textColor: tag.textColor,
          bgColor: tag.bgColor,
        };
        tag.tracks.forEach((uri) => {
          // if tag doesn't exists in map add it
          if (!trackTagMap.has(uri)) {
            trackTagMap.set(uri, [tagObj]);
          } else {
            // key already exists
            const tagArr = trackTagMap.get(uri);
            trackTagMap.set(uri, [...tagArr, tagObj]);
          }
        });
      });
    }
    console.log("Getting tracks...");
    while (moreData) {
      const playlistTracks = await spotifyFetcher(tracksEndpoint, token);
      console.log("still getting tracks");
      let items = playlistTracks.items.map((item) => {
        if (item.track === null) {
          return null;
        }
        const uri =
          item.track.linked_from !== undefined
            ? item.track.linked_from.uri
            : item.track.uri;
        const tagArray =
          typeof trackTagMap.get(uri) !== "undefined"
            ? trackTagMap.get(uri)
            : [];
        return {
          id: item.track.id,
          uri,
          name: item.track.name,
          duration: item.track.duration_ms.toString(),
          images: item.track.album.images,
          artists: item.track.artists,
          firstArtist: item.track.artists[0].name,
          albumId: item.track.album.id,
          albumName: item.track.album.name,
          tagArray,
        };
      });

      items = items.filter((item) => item !== null);

      tracks = [...tracks, ...items];

      if (playlistTracks.next) {
        tracksEndpoint = sliceBaseUrl(playlistTracks.next);
      } else {
        moreData = false;
      }
    }
    playlistData = { ...playlistData, tracks };
    res.send(playlistData);
  } catch (err) {
    console.warn(err);
  }
};
