import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { TagType } from "../../../lib/types";
import Tag from "../../../models/Tag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const newTag: TagType = {
      name: "Meow",
      textColor: "white",
      bgColor: "red",
      playlistId: "r17",
      userId: "g90",
    };
    const tag = await Tag.create(newTag);
    res.send(tag);
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
};
