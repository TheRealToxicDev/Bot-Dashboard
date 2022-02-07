import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.COOKIE_SECRET as string,
    cookieName: "c-session",
    ttl: 15 * 24 * 3600,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
    },
  });
}
