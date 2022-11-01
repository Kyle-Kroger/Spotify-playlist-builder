import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { TagType } from "../../../lib/types";
import Tag from "../../../models/Tag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  const { name, textColor, bgColor, userId, trackUri } = req.body;
  if (req.method === "POST") {
    try {
      await dbConnect();
      const newTag: TagType = {
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
      console.warn(err);
      res.status(400).json({ success: false });
    }
  }
};
