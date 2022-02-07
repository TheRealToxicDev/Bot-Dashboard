import { NextSeo } from "next-seo";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { User } from "../../typings/types";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: ReactNode;
  title?: string;
  user?: User;
  description?: string;
}

export default function Container({
  children,
  title,
  user,
  description,
}: Props) {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.origin);
  }, []);

  return (
    <>
      {title && (
        <NextSeo
          title={`${title} - Protect Bot`}
          additionalLinkTags={[
            {
              rel: "icon",
              href: "/ProtectBot.jpg",
            },
          ]}
          additionalMetaTags={[
            {
              property: "og:title",
              content: `${title} - Protect Bot`,
            },
            {
              property: "og:type",
              content: "website",
            },
            {
              property: "og:url",
              content: `${domain}/${title}`,
            },
            {
              property: "og:image",
              content: `/ProtectBot.jpg`,
            },
            {
              property: "og:description",
              content: description
                ? description
                : `Phishing & Scam Detection & Prevention System For Discord Servers.`,
            },
            {
              name: "theme-color",
              content: "#4b0202",
            },
          ]}
        />
      )}
      <ToastContainer />
      <div className="flex flex-col h-screen justify-between">
        <Navbar user={user} />
        <div className="flex justify-center mx-8">
          <div className="max-w-7xl relative w-full">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
