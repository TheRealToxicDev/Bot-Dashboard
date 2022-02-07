import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Image from "next/image";
import { Guild, invite, User } from "../../typings/types";
import Link from "next/link";
import LoadingCat from "../../components/LoadingCat";

interface Props {
  user?: User;
  guilds?: Array<Guild>;
}

export default function Dashboard({ user, guilds }: Props) {
  const [loading, setLoading] = useState(false);
  const [gridGuilds] = useState<any[]>([]);
  const [loadedGuilds, setLoadedGuilds] = useState<boolean | null>(true);
  const [clientGuilds, setClientGuilds] = useState([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.origin);
    setLoading(!loading);

    if (guilds) {
      for (let i = 0; i < guilds.length; i += 4) {
        const newArray = [
          guilds[i],
          guilds[i + 1],
          guilds[i + 2],
          guilds[i + 3],
        ];

        if (loadedGuilds == null) break;
        gridGuilds.push(newArray);
      }
    }

    setTimeout(() => setLoading(false), 2000);
    setLoadedGuilds(null);

    fetch(origin + "/api/client/guilds").then(async (e) => {
      const res = await e.json();
      setClientGuilds(res);
    });
  }, []);

  return (
    <Container
      user={user}
      title="Dashboard"
      description="Manage your servers and configure the bot easily using the dashboard."
    >
      <br />
      {user ? (
        <div className="flex flex-row justify-center items-center lg:mt-15 space-x-3">
          {loading && <LoadingCat text="Loading Servers..." />}
          {!loading && (
            <>
              <table>
                {guilds &&
                  gridGuilds?.map((row, index) => (
                    <tr key={row[index]}>
                      {row.map((gd: any) => {
                        return (
                          <th key={index}>
                            <div className="border-d-tab space-x-4">
                              <div className="border-l-2 border-transparent relative">
                                <div className="py-6 px-3 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-3 backdrop-blur">
                                  <div className="flex-shrink-0 flex justify-center items-center">
                                    <Image
                                      src={
                                        gd.icon !== null
                                          ? `https://cdn.discordapp.com/icons/${gd.id}/${gd.icon}.png`
                                          : decodeURI(
                                              `https://ui-avatars.com/api/?name=${gd.name
                                                .split(" ")
                                                .join("+")}`
                                            )
                                      }
                                      height={56}
                                      width={56}
                                      alt="avatar"
                                      className="w-8 rounded-full bg-white"
                                    ></Image>
                                  </div>
                                  <p className="px-5 py-1 text-xs  font-semibold flex justify-center items-center text-black-500  border-indigo-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2">
                                    {gd.name}
                                  </p>
                                  <div className="flex justify-center items-center">
                                    <Link
                                      href={
                                        clientGuilds.find(
                                          (g: Guild) => g.id == gd.id
                                        )
                                          ? `/manage/${gd.id}`
                                          : invite(gd.id)
                                      }
                                      passHref
                                    >
                                      <button className="px-5 py-1 text-sm text-gray-50 bg-gray-500 font-bold rounded-md border border-gray-400 hover:bg-gray-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2">
                                        Manage
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
              </table>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center lg:mt-15 space-x-3 text-white">
          <LoadingCat text="You need to be logged in to access our dashboard. Or we failed to load your Guilds. Please try again later" />
        </div>
      )}
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
