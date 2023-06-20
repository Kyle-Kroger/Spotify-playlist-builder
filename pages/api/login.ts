import { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url";
import Cookies from "cookies";

import { generateRandomString } from "../../lib/utils";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // set cookie with state
  const state = generateRandomString(16);
  const cookies = new Cookies(req, res);
  cookies.set("spotify_auth_state", state);

  // Scope for authorization
  const scope =
    "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state streaming";

  const paramsObject = {
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state,
    scope,
  };
  const searchParams = new URLSearchParams(paramsObject);

  res.redirect(`https://accounts.spotify.com/authorize?${searchParams}`);
};
