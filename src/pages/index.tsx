import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../components/ui/Container";
import { invite, PageProps } from "../typings/types";
import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

let features = [
  {
    name: "Phishing Detection",
    description: `We use large scam databases plus AI systems to ensure every phishing domain is detected.`,
    icon: faAnchor,
  },
  {
    name: "Scam Detection",
    description: `Our Powerful Detection API's are used to detect every scam in your server.`,
    icon: faAnchor,
  },
  {
    name: "Nitro Scams",
    description: `Our Powerful Nitro Detection API's & AI Systems are used to detect every scam in your server.`,
    icon: faAnchor,
  },
  {
    name: "Public API",
    description: `Our API is Made with and Backed by a Powerful, Blazing Fast Fastify Server.`,
    icon: faAnchor,
  },
  {
    name: "Customizable",
    description: `Our customizable system allows the user to customise every setting.`,
    icon: faAnchor,
  },
  {
    name: "Country Restrictions",
    description: `We know and understand that a lot of phishing attacks originate out of the CUS region. We provide a option to put a blanket ban on their domains`,
    icon: faAnchor,
  },
  {
    name: "Powerful API",
    description: `The detection database operates internally and pulls from external sources for up-to date links.`,
    icon: faAnchor,
  },
  {
    name: "US Hosted",
    description: `All services are hosted in Dallas for the best API responce times.`,
    icon: faAnchor,
  },
  {
    name: "Security First",
    description: `All services use state of the art security to protect our servers from attacks and breachs.`,
    icon: faAnchor,
  },
];

export default function Home({ user }: PageProps) {
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
      <Container title="Home" user={user}>
      <div className="px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
        <p className="text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl lg:text-center dark:text-white">
          Protect Bot
        </p>
        <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center">
          Phishing & Scam Detection & Prevention System For Discord Servers.
        </p>
        <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {features.map((feature) => (
            <div
              className="p-10 w-auto bg-white shadow-lg rounded-xl dark:bg-opacity-5 hover:bg-main-700 hover:border border-black"
              key={feature.name}
            >
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
        <br />
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
