/* eslint-disable camelcase */
import { NextApiResponse, NextApiRequest } from "next";
import { URLSearchParams } from "url";
import cookie from "cookie";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const auth = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
)}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const bodyData = {
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  };
  const urlEncoded = new URLSearchParams(bodyData);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth,
      },
      body: urlEncoded,
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    const { access_token, refresh_token, scope } = data;

    const tokenCookieArr = [];

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

      tokenCookieArr.push(accessTokenCookie);
    }

    if (refresh_token) {
      const refreshTokenCookie = cookie.serialize(
        "SPOTIFY_REFRESH_TOKEN",
        refresh_token,
        {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 365,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        }
      );

      tokenCookieArr.push(refreshTokenCookie);
    }

    res.setHeader("Set-Cookie", tokenCookieArr);

    if (response.status === 200) {
      res.send(data);
    } else {
      res.json(data);
    }
  } catch (err) {
    console.warn(err);
  }
};
