import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({
      success: true,
      message: "Please enter in a playlistId in the url after tag",
    });
  } catch (err) {
    console.warn(err);
    // probably should redirct to the login page or an error page before login
  }
};
