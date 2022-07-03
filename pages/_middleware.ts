import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.SPOTIFY_ACCESS_TOKEN;

    const url = req.nextUrl.clone();
    url.pathname = "/login";

    // attempt refresh if needed
    if (!token) {
      return NextResponse.redirect(url);
    }
  }
}
