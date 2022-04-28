/* eslint-disable camelcase */
import { NextApiResponse, NextApiRequest } from "next";
import { URLSearchParams } from "url";
import cookie from "cookie";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const auth = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
)}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { SPOTIFY_REFRESH_TOKEN: refresh_token } = req.cookies;

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

    const { access_token } = await response.json();

    if (access_token) {
      const accessTokenCookie = cookie.serialize(
        "SPOTIFY_ACCESS_TOKEN",
        access_token,
        {
          httpOnly: true,
          maxAge: 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        }
      );

      res.setHeader("Set-Cookie", accessTokenCookie);
    }

    res.send(access_token);
  } catch (err) {
    console.warn(err);
    res.send({ error: err.message });
  }
};
