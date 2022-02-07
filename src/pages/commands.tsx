import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { PageProps } from "../typings/types";
import Script from "next/script";

export default function Commands({ user }: PageProps) {
  const [domain, setDomain] = useState("");
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const handleResize = () => {
    setMobile(document.documentElement.clientWidth < 900);
  };
  useEffect(() => {
    if (router.query.r) {
      location.replace("/");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NextSeo
        title={`Commands - Protect Bot`}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/img/ProtectBot.jpg",
          },
        ]}
        additionalMetaTags={[
          {
            property: "og:title",
            content: `Commands - Protect Bot`,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            property: "og:url",
            content: `${domain}/commands`,
          },
          {
            property: "og:image",
            content: `/ProtectBot.jpg`,
          },
          {
            property: "og:description",
            content: "View a list of the Protect Bot Commands",
          },
          {
            name: "theme-color",
            content: "#2F3136",
          },
        ]}
      />
      <Container title="Commands" user={user}>
        <Script strategy="beforeInteractive" src="/scripts/intercom.js" />
        <div className="w-full h-screen flex flex-col">
          <div className="flex flex-col space-y-2">
            <br />
            <br />
            <div className="items-center justify-center flex mx-auto text-light-200 text-6xl font-bold font-montserrat">
              Commands!
            </div>
            <div className="flex mx-auto text-light-200 text-2xl font-montserrat">
              All of the Protect Bot Commands are Application/Slash Commands!
            </div>
            <table className="shadow-lg bg-main-600">
              <tr>
                <th className="bg-main-700 border text-left text-white px-8 py-4">
                  Name
                </th>
                <th className="bg-main-700 border text-left text-white px-8 py-4">
                  Desc
                </th>
                <th className="bg-main-700 border text-left text-white px-8 py-4">
                  Usage
                </th>
                <th className="bg-main-700 border text-left text-white px-8 py-4">
                  Perms
                </th>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Help</td>
                <td className="text-white border px-8 py-4">
                  Show a list of available commands and info
                </td>
                <td className="text-white border px-8 py-4">/help</td>
                <td className="text-white border px-8 py-4">SEND_MESSAGES</td>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Donate</td>
                <td className="text-white border px-8 py-4">
                  If you would like to support us you can donate to the Protect
                  Team using the donate command!
                </td>
                <td className="text-white border px-8 py-4">/donate</td>
                <td className="text-white border px-8 py-4">SEND_MESSAGES</td>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Protect</td>
                <td className="text-white border px-8 py-4">
                  This command simply toggles on or off the bot's protection
                  capabilities. Set the value of this command to false to
                  temporarily stop server protection measures, should you
                  encounter a bug
                </td>
                <td className="text-white border px-8 py-4">
                  /protect [Options]
                </td>
                <td className="text-white border px-8 py-4">MANAGE_MESSAGES</td>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Russian Links</td>
                <td className="text-white border px-8 py-4">
                  This command will enforce a blanket ban on Russian originating
                  web pages. Note, this is not a requirement for operation, and
                  is just another precaution, as a lot of phishing attacks
                  originate out of the CUS region. Only enforce this if you want
                  a complete ban on their domains.
                </td>
                <td className="text-white border px-8 py-4">
                  /russianlinks [Options]
                </td>
                <td className="text-white border px-8 py-4">MANAGE_MESSAGES</td>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Nitro Scams</td>
                <td className="text-white border px-8 py-4">
                  The Nitro Scams Module will ensure certain keywords relating
                  to Free Nitro or Discord Giving Away Nitro would be detected
                  by our AI detection and deleted.
                </td>
                <td className="text-white border px-8 py-4">
                  /nitroscams [Options]
                </td>
                <td className="text-white border px-8 py-4">MANAGE_MESSAGES</td>
              </tr>
              <tr>
                <td className="text-white border px-8 py-4">Logs</td>
                <td className="text-white border px-8 py-4">
                  This command allows you to toggle a logs channel, for all of
                  the various violations that can occur, should your server come
                  under attack.
                </td>
                <td className="text-white border px-8 py-4">/logs</td>
                <td className="text-white border px-8 py-4">MANAGE_MESSAGES</td>
              </tr>
            </table>
          </div>
        </div>
      </Container>
    </>
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