/* eslint-disable camelcase */
import { NextApiResponse, NextApiRequest } from "next";
import { URLSearchParams } from "url";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const auth = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
)}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { refresh_token } = req.query;

  const bodyData = {
    grant_type: "refresh_token",
    refresh_token,
  };

  const urlEncoded = new URLSearchParams(bodyData);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
      body: urlEncoded,
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();

    res.send(data);
  } catch (err) {
    console.warn(err);
    res.send({ error: err.message });
  }
};
