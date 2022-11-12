import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { ITag } from "../../../lib/types";
import Tag from "../../../models/Tag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  if (req.method === "POST") {
    const { name, textColor, bgColor, userId, trackUri } = req.body;
    try {
      await dbConnect();
      const newTag: ITag = {
        name,
        textColor,
        bgColor,
        playlistId,
        userId,
      };
      // Check if tag exists in playlist
      let currentTag = await Tag.findOne({ userId, playlistId, name });

      if (!currentTag) {
        // Add tag if it doesn't exist
        await Tag.create(newTag);
        currentTag = await Tag.findOne({ userId, playlistId, name });
      }

      // Add current song id to the songs array
      if (typeof trackUri !== "undefined") {
        // Check if track already has this tag
        if (
          typeof currentTag.tracks.find((e) => e === trackUri) === "undefined"
        ) {
          currentTag.tracks.push(trackUri);
          await currentTag.save();
        }
      }
      res.status(200).json(currentTag);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      // get tags of a the playlist
      await dbConnect();

      const playlistTags = await Tag.find({ playlistId });

      if (playlistTags.length < 1) {
        throw new Error("playlist with that id was not found");
      }
      return res.status(200).json(playlistTags);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  if (req.method === "DELETE") {
    const { id, trackUri, deleteAll = false } = req.body;
    let message = "";
    try {
      await dbConnect();

      const deleteTag = await Tag.findById(id);

      if (!deleteTag) {
        throw new Error("Tag with that id could not be found");
      }

      // delete the tag on a song (remove from song arr)
      if (!deleteAll && trackUri !== undefined) {
        // find song and delete it
        const deleteIndex = deleteTag.tracks.findIndex(
          (uri) => uri === trackUri
        );

        if (deleteIndex === -1) {
          throw new Error(
            `The track uri of ${trackUri} could not be found on tag with id of ${id}`
          );
        }

        deleteTag.tracks.splice(deleteIndex, 1);
        await deleteTag.save();
        message = `The trackUri of ${trackUri} has been deleted from the tag with an idea of ${id}`;
      }

      if (deleteAll) {
        // delete the entire tag document
        // eslint-disable-next-line no-underscore-dangle
        await Tag.deleteOne({ _id: deleteTag._id });
        message = `The tag with id ${id} has been deleted from the collection`;
      }

      return res.status(200).json({ success: true, message });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};
