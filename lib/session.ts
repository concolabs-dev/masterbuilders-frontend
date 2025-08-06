import { SessionOptions, getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";

export interface UserSession {
  username?: string;
  role?: string;
}

export const sessionOptions: SessionOptions = {
  cookieName: "auth_session",
  password: process.env.SESSION_SECRET || "G7h8Jk9Lm0Np1Qw2Er3Tz4Ui5Op6As7D",
  cookieOptions: {
    secure:  false,
    httpOnly: true,
    sameSite: "lax",
  },
};

// Helper function to get session
export async function getSession(req: NextRequest) {
    console.log("Cookies received:", req.cookies.getAll());
  let session = await getIronSession<UserSession>(req, new NextResponse(), sessionOptions);
  console.log("Session:", session);
  return session;
}
