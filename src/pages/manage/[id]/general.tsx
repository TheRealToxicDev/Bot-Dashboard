import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { doNothing, User } from "../../../typings/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import { Guild } from "../../../typings/types";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "../../../components/Avatar";
import { toast } from "react-toastify";

interface Props {
  user?: User;
  guilds?: Array<Guild>;
}

export default function GeneralSetting({ user, guilds }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [currentGuild, setCurrentGuild] = useState<Guild>();
  const [newPrefix, setNewPrefix] = useState("");
  const [prefix, setPrefix] = useState("");
  const [origin, setOrigin] = useState("");

  function getPrefix(origin: string) {
    return fetch(origin + "/api/client/guilds/" + id + "/prefix", {
      method: "GET",
    }).then(async (e) => {
      const res = await e.json();
      if (res.error) return undefined;
      return res.prefix;
    });
  }

  function changePrefix(origin: string, value: string) {
    return fetch(
      origin + "/api/client/guilds/" + id + "/prefix" + `?prefix=${value}`,
      {
        method: "POST",
      }
    );
  }

  useEffect(() => {
    if (!id) return location.replace("/404");

    if (!user || !guilds) return location.replace("/");

    setOrigin(window.origin);

    getPrefix(window.origin).then((e) => setPrefix(e));

    fetch(window.origin + "/api/client/guilds").then(async (e) => {
      const res = await e.json();

      doNothing();

      try {
        if (!res?.find((e: Guild) => e.id == id)) location.replace("/404");
      } catch (e) {}
    });

    setCurrentGuild(guilds?.find((e) => e.id == id));
  }, []);

  return (
    <Container user={user} title="Manage">
      <div className="flex flex-col justify-center items-center md-32 lg:md-32">
        <div className="bg-white px-5 py-3 rounded-md space-y-3">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2 p-2">
              <Avatar
                link={
                  currentGuild?.icon !== null
                    ? `https://cdn.discordapp.com/icons/${currentGuild?.id}/${currentGuild?.icon}.png`
                    : decodeURI(
                        `https://ui-avatars.com/api/?name=${currentGuild?.name
                          .split(" ")
                          .join("+")}`
                      )
                }
                width={32}
                height={32}
              />
              <div className="text-dark-400 dark:text-white font-semibold">
                {currentGuild?.name}{" "}
              </div>
            </div>
          </div>
          <p>Prefix</p>
          <input
            type="text."
            className="shadow appearance-none border rounded-md flex justify-center items-center w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="new-prefix"
            placeholder={"Type your new prefix here!"}
            onChange={(e) => setNewPrefix(e.target.value)}
            defaultValue={prefix !== undefined ? prefix : "c!"}
          />

          <div className="flex flex-row justify-center items-center space-x-4">
            <button
              className="px-3 py-2 bg-green-500 text-light-200 rounded-full font-semibold hover:bg-green-600"
              onClick={() => {
                if (
                  prefix == newPrefix ||
                  // @ts-ignore
                  prefix == document.getElementById("new-prefix")?.value
                ) {
                  return toast.warn("You cannot save the same prefix", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    draggable: false,
                    pauseOnHover: false,
                  });
                }

                changePrefix(origin, newPrefix);
                toast.dark(`Successfully saved the changes`, {
                  position: toast.POSITION.TOP_RIGHT,
                  draggable: false,
                  pauseOnHover: false,
                  icon: (
                    <Image
                      src={"/img/check.png"}
                      alt="Logo"
                      className="w-8 bg-transparent rounded-full"
                      width={32}
                      height={32}
                    />
                  ),
                });
              }}
            >
              Save Prefix
            </button>
            <Link href={`/manage/${currentGuild?.id}`} passHref>
              <button className="px-2 py-1 bg-red-500 text-xm text-light-200 rounded-md hover:bg-red-600">
                Back to menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function indexRoute({ req }) {
    const { user, guilds } = req.session;

    return {
      props: user && guilds ? { user, guilds } : {},
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
