import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../components/ui/Container";
import { PageProps } from "../typings/types";
import Link from "next/link";
import Script from "next/script";

let features = [
  {
    name: "Air Force Gaming",
    description: `ir Force Gaming is the official gaming program and competition hub for the United States Air Force and Space Force.`,
    url: "https://discord.gg/airforcegaming",
    website: "https://airforcegaming.com",
    image: "https://storage.airforcegaming.com/afg/key_art/logos/icon.png",
  },
  {
    name: "MVG Charity",
    description: `safe environment for veterans, service members and proud patriots by establishing Esprit De Corps and improving quality of life through Gaming and Mental Health Peer Support Programs.`,
    url: "https://discord.gg/military",
    website: "https://mvgcharity.org/",
    image: "http://mvgcharity.org/assets/images/logo-dark.png",
  },
  {
    name: "The United Service Organization",
    description: `We go where no other nonprofits can to keep our united states service members connected to everything that gives meaning to their service.`,
    url: " https://discord.gg/theuso",
    website: "https://www.uso.org/",
    image: "https://www.uso.org/app-icon.png",
  },
  {
    name: "Infinity Bot List",
    description: "The future of bot listing services",
    url: "https://discord.gg/MXMfYWUftV",
    website: "https://infinitybotlist.com",
    image:
      "https://cdn.infinitybots.xyz/images/png/Infinity5.png",
  },
];

export default function Partners({ user }: PageProps) {
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
      <Container title="Partners" user={user}>
        <Script strategy="beforeInteractive" src="/scripts/intercom.js" />
        <div className="px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <p className="text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl lg:text-center dark:text-white">
            Partners
          </p>
          <p className="mx-auto mt-4 text-lg font-medium text-gray-400 lg:max-w-3xl lg:text-xl lg:text-center">
            ProtectBot Server Partners
          </p>
          <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 ">
            {features.map((feature) => (
              <div
                className="p-10 w-auto bg-white shadow-lg rounded-xl dark:bg-opacity-5 hover:bg-main-700 hover:border border-black"
                key={feature.name}
              >
                <Image alt="test" src={feature.image} className="favicon rounded-full" width={50} height={50} />
                <div className="mt-4">
                  <h3 className="text-lg font-medium dark:text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                  <br />
                  <div className="grid grid-cols-1 items-center justify-center">
                    <Link href={feature.url} passHref>
                      <button className="px-10 w-auto mb-5 font-medium rounded-md text-red-600 bg-white hover:bg-black-50 py-1 drop-shadow-xl dark:drop-shadow-none">
                        Join Server
                      </button>
                    </Link>
                    <Link href={feature.website} passHref>
                      <button className="px-10 w-auto mb-5 font-medium rounded-md text-red-600 bg-white hover:bg-black-50 py-1 drop-shadow-xl dark:drop-shadow-none">
                        More Info
                      </button>
                    </Link>
                  </div>
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