import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../typings/types";
import { Avatar } from "./Avatar";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  user?: User;
}

export default function Navbar({ user }: Props) {
  const [hamburger, setHamburger] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccountExpanded, setMobileAccountExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = hamburger ? "hidden" : "auto";
  }, [hamburger]);

  useEffect(() => {
    function handleResize() {
      setHamburger(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center text-lg">
        <nav className="drop-shadow-xl dark:drop-shadow-none bg-light-200 dark:bg-main-800 lg:rounded-md flex justify-between p-4 mt-0 w-full">
          <div className="flex items-center">
            <Image
              className="favicon w-8 bg-transparent rounded-full hover:transform:rotate(360deg)"
              src={"/ProtectBot.jpg"}
              alt="Logo"
              width={42}
              height={42}
              onClick={() => location.replace("/")}
            />
            <ul className="ml-5 space-x-4 hidden lg:flex">
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/commands">Commands</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/partners">Partners</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/discord">Discord</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/invite">Invite</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/soon">Terms</Link>
              </li>
              <li className="inline-block text-gray-800 dark:text-light-200 hover:text-main-300 dark:hover:text-red-500">
                &nbsp;
                <Link href="/soon">Privacy</Link>
              </li>
            </ul>
            <div className="ml-4 text-xl font-montserrat font-bold inline-block lg:hidden text-gray-800 dark:text-light-200">
              Protect Bot
            </div>
          </div>
          <div className="items-center relative hidden lg:flex">
            {!user && (
              <Link href="/api/auth/authorized" passHref>
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-black-50 ml-5 flex-coldrop-shadow-xl dark:drop-shadow-none pl-4">
                  Login with Discord
                </button>
              </Link>
            )}
            {user && (
              <div
                className="pl-4 h-full flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Dropdown
                  content={
                    <div className="flex items-center space-x-2 p-2 bg-white border rounded border-main-800 font-semibold">
                      <Avatar link={user.avatar} width={32} height={32} />
                      <div className="text-black dark:text-black">
                        {user.username}#{user.discriminator}{" "}
                        <Image
                          src={dropdownOpen ? "/uparrow.svg" : "/downarrow.svg"}
                          alt="Up Arrow SVG"
                          width={14}
                          height={14}
                          className="transition-transform"
                        />
                      </div>
                    </div>
                  }
                  options={[
                    {
                      label: "Dashboard",
                      link: "/soon",
                      variant: "normal",
                    },
                    {
                      label: "Logout",
                      link: "/api/auth/logout",
                      variant: "danger",
                    },
                  ]}
                />
              </div>
            )}
          </div>
          <div
            className="items-center relative flex lg:hidden cursor-pointer select-none text-main-500 dark:text-light-100"
            onClick={() => setHamburger(!hamburger)}
          >
            {!hamburger ? (
              <>
                <span className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-black-50 ml-5 drop-shadow-xl dark:drop-shadow-none">
                  Menu
                </span>
              </>
            ) : (
              <span className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-black-50 ml-5 drop-shadow-xl dark:drop-shadow-none ">
                Close Menu
              </span>
            )}
          </div>
        </nav>
        {hamburger && (
          <ul className="absolute flex flex-col bg-light-200 dark:bg-main-900 box-border w-screen h-screen z-[9999999] px-6 top-[74px]">
            <Link href="/commands" passHref>
              <li className="text-dark-400 dark:text-white hover:text-light-600 pt-5">
                <FontAwesomeIcon
                  className="align-items"
                  icon={["fas", "code"]}
                />{" "}
                Commands
              </li>
            </Link>
            <Link href="/discord" passHref>
              <li className="text-dark-400 dark:text-white hover:text-red-500 pt-5">
                <FontAwesomeIcon
                  className="align-items"
                  icon={["fab", "discord"]}
                />{" "}
                Discord
              </li>
            </Link>
            <Link href="/invite" passHref>
              <li className="text-dark-400 dark:text-white hover:text-red-500 pt-5">
                <FontAwesomeIcon
                  className="align-items"
                  icon={["fas", "plus"]}
                />{" "}
                Invite
              </li>
            </Link>
            <Link href="/soon" passHref>
              <li className="text-dark-400 dark:text-white hover:text-red-500 pt-5">
                <FontAwesomeIcon
                  className="align-items"
                  icon={["fas", "gavel"]}
                />{" "}
                Terms
              </li>
            </Link>
            <Link href="/soon" passHref>
              <li className="text-dark-400 dark:text-white hover:text-red-500 pt-5">
                <FontAwesomeIcon
                  className="align-items"
                  icon={["fas", "book"]}
                />{" "}
                Privacy
              </li>
            </Link>
            <br />
            {user ? (
              <div className="mt-5 pt-5 border-t-[1px] border-main-600">
                <div
                  className="flex items-center justify-between w-full select-none"
                  onClick={() =>
                    setMobileAccountExpanded(!mobileAccountExpanded)
                  }
                >
                  <div className="flex items-center space-x-3 bg-black">
                    <Avatar
                      link={user.avatar}
                      width={46}
                      height={46}
                      className="w-7 background-transparent rounded-full"
                    />
                    <h3 className="text-xl italic text-main-500 font-semibold leading-none">
                      {user.username}#{user.discriminator}
                    </h3>
                  </div>
                </div>
                <div
                  id="account-links"
                  className="pl-3 mb-5 overflow-hidden transition-all ease"
                  style={{
                    height: mobileAccountExpanded
                      ? user.moderator
                        ? "144px"
                        : "96px"
                      : "0px",
                  }}
                ></div>
                <Button
                  variant="danger"
                  size="medium"
                  block
                  href="/api/auth/logout"
                >
                  Dashboard
                </Button>
                <Button
                  variant="danger"
                  size="medium"
                  block
                  href="/api/auth/logout"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/api/auth/authorized" passHref>
                  <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-black-50 ml-5 drop-shadow-xl dark:drop-shadow-none pl-4">
                    Login with Discord
                  </button>
                </Link>
                <br />
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
}