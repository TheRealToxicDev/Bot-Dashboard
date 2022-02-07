import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { doNothing, GuildChannel, User } from "../../../typings/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import { Guild } from "../../../typings/types";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "../../../components/Avatar";
import { toast } from "react-toastify";
import Dropdown from "../../../components/ui/Dropdown";
interface OptionPost {
  channel?: string;
  message?: string;
}

interface Props {
  user?: User;
  guilds?: Array<Guild>;
}

const optionVariants = {
  normal: "text-neutral-300",
  danger: "text-red-600 font-semibold",
};

interface Option {
  label: string;
  link?: string;
  icon?: string;
  variant?: keyof typeof optionVariants;
  onClick?: (e: any) => void;
  customId?: string;
}

export default function GeneralSetting({ user, guilds }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [currentGuild, setCurrentGuild] = useState<Guild>();
  const [origin, setOrigin] = useState("");
  const [channels, setChannels] = useState<Option[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pickedChannel, setPickedChannel] = useState<string>();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [pickedChannelId, setPickedChannelId] = useState("");
  const [currentSetChannel, setCurrentSetChannel] = useState("");
  const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);

  function changeChannel(origin: string, options: OptionPost) {
    console.log(
      origin +
        "/api/client/guilds/" +
        id +
        "/welcome" +
        `?${options.channel ? `channel=${options.channel}` : ""}${
          options.message ? `&message=${options.message}` : ""
        }`
    );

    return fetch(
      origin +
        "/api/client/guilds/" +
        id +
        "/welcome" +
        `?${options.channel ? `channel=${options.channel}` : ""}${
          options.message ? `&message=${options.message}` : ""
        }`,
      {
        method: "POST",
      }
    );
  }

  function getChannels(origin: string): Promise<Array<GuildChannel>> {
    return fetch(origin + "/api/client/guilds/" + id + "/channels", {
      method: "GET",
    }).then(async (e) => {
      const res = await e.json();
      return res.filter((e: any) => e.type == 0);
    });
  }

  function getCurrentSetChannel(origin: string) {
    return fetch(origin + "/api/client/guilds/" + id + "/welcome", {
      method: "GET",
    }).then(async (e) => {
      const res = await e.json();
      if (res.error) return undefined;
      else {
        const fetchedChannel = await fetchChannel(origin, res.channel);
        return await fetchedChannel;
      }
    });
  }

  function fetchChannel(origin: string, channel_id: string) {
    return fetch(
      origin +
        "/api/client/guilds/" +
        id +
        "/channels?channel_id=" +
        channel_id,
      {
        method: "POST",
      }
    ).then(async (e) => {
      const res = await e.json();
      if (res.error) return undefined;
      else return res.name;
    });
  }

  useEffect(() => {
    if (!id) return location.replace("/404");
    if (!user || !guilds) return location.replace("/");

    setOrigin(window.origin);

    fetch(window.origin + "/api/client/guilds").then(async (e) => {
      const res = await e.json();

      doNothing();

      try {
        if (!res?.find((e: Guild) => e.id == id)) location.replace("/404");
      } catch (e) {}
    });

    setCurrentGuild(guilds?.find((e) => e.id == id));

    getChannels(window.origin).then((e) => {
      const array: Option[] = [];
      e.forEach((r) => {
        array.push({
          label: `#${r.name}`,
          variant: "normal",
          customId: `${r.id}`,
        });
      });

      setChannels(array);
    });

    getCurrentSetChannel(window.origin).then((e) => {
      setCurrentSetChannel(e);
    });
  }, []);

  return (
    <Container user={user} title="Manage">
      <br />
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
          <p>Welcome Channel</p>
          <Dropdown
            content={
              <div
                className="flex items-center space-x-2 p-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="text-dark-400 dark:text-white">
                  {pickedChannel
                    ? pickedChannel
                    : currentSetChannel
                    ? `#${currentSetChannel}`
                    : "Pick the channel to set"}{" "}
                </div>
              </div>
            }
            clickEvent={({ label, customId }) => {
              setPickedChannel(`${label}`);
              setPickedChannelId(`${customId}`);
            }}
            options={channels}
          />
          <p>Welcome Channel</p>
          <Dropdown
            content={
              <div
                className="flex items-center space-x-2 p-2"
                onClick={() => setMessageDropdownOpen(!dropdownOpen)}
              >
                <div className="text-dark-400 dark:text-white">
                  Welcome Message Options
                </div>
              </div>
            }
            options={[
              {
                label: "{user.tag} - Display the user tag",
                variant: "normal",
              },
              {
                label: "{user.id} - Display the user ID",
                variant: "normal",
              },
              {
                label: "{guild} - Display the server name",
                variant: "normal",
              },
            ]}
          />
          <textarea
            className=" 
            w-full bg-light-500 dark:bg-main-500 px-2 py-3 outline-none text-black dark:text-light-300 text-sm h-36 overflow-hidden rounded-md placeholder-gray-500"
            maxLength={2000}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            value={welcomeMessage}
            placeholder={""}
            id="new-message"
          />
          <div className="flex flex-row justify-center items-center space-x-4">
            <button
              className="px-3 py-2 bg-green-500 text-light-200 rounded-full font-semibold hover:bg-green-600"
              onClick={() => {
                if (!pickedChannel?.length && !welcomeMessage)
                  return toast.error("You need to set new changes", {
                    position: toast.POSITION.TOP_RIGHT,
                    draggable: false,
                    pauseOnHover: false,
                    icon: (
                      <Image
                        src={"/img/cross.png"}
                        alt="Logo"
                        className="w-8 bg-transparent rounded-md"
                        width={32}
                        height={32}
                      />
                    ),
                  });

                changeChannel(origin, {
                  channel: pickedChannelId ? pickedChannelId : undefined,
                  message: welcomeMessage ? welcomeMessage : undefined,
                });

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
              Save Changes
            </button>
            <Link href={`/manage/${currentGuild?.id}`} passHref>
              <button className="px-2 py-1 bg-red-500 text-xm text-light-200 rounded-md hover:bg-red-600">
                Back to menu
              </button>
            </Link>
          </div>
        </div>
      </div>
      <br />
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
