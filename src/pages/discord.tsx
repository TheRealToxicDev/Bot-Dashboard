import Link from "next/link";
import Head from 'next/head';

export default function Discord() {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html charset=utf-8" />
        <meta
          httpEquiv="refresh"
          content="5;URL=https://discord.gg/JBgMwVuDjB"
        />
      </Head>
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div className="flex flex-col space-y-2">
        <div className="text-white text-6xl font-bold font-montserrat">
          Redirect in Progress!!
        </div>
        <div className="font-montserrat font-bold text-white dark:text-white">
          You are being redirected to our Discord Server. If for some reason this redirect hangs please click the button below!
        </div>
        <br />
        <Link href="https://discord.gg/JBgMwVuDjB" passHref>
          <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-main-500 bg-main-600 hover:bg-main-700 font-semibold rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
    </>
  );
}