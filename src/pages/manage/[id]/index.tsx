import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { doNothing, User } from "../../../typings/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import { Guild } from "../../../typings/types";
import Link from "next/link";

interface Props {
  user?: User;
  guilds?: Array<Guild>;
}

export default function ManageGuild({ user, guilds }: Props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return location.replace("/404");
    if (!user) return location.replace("/");

    fetch(window.origin + "/api/client/guilds").then(async (e) => {
      const res = await e.json();

      doNothing();

      try {
        if (!res?.find((e: Guild) => e.id == id)) location.replace("/404");
      } catch (e) {}
    });
  }, []);

  return (
    <Container user={user} title="Manage">
      <div className="flex flex-col justify-center items-center md-32 lg:md-32">
        <div className="bg-main-600 ml-5 px-5 py-3 rounded-md space-x-3 space-y-3">
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-white text-xl">Server Configuration</h1>
          </div>
          <Link href={`/manage/${id}/general`} passHref>
            <button className="px-3 py-2 bg-main-700 text-light-200 rounded-md font-semibold hover:bg-red-500">
              Detection Settings
            </button>
          </Link>
          <Link href={`/manage/${id}/welcome`} passHref>
            <button className="px-3 py-2 bg-main-700 text-light-200 rounded-md font-semibold hover:bg-red-500">
              General Settings
            </button>
          </Link>
          <Link href={`/manage/${id}/welcome`} passHref>
            <button className="px-3 py-2 bg-main-700 text-light-200 rounded-md font-semibold hover:bg-red-500">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function indexRoute({ req }) {
    const { user } = req.session;

    return {
      props: user ? { user } : {},
    };
  },
  {
    password: process.env.COOKIE_SECRET as string,
    cookieName: "c-session",
    ttl: 15 * 24 * 3600,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
    },
  }
);
