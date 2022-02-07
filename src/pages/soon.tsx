import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div className="flex flex-col space-y-2">
        <div className="text-white text-6xl font-bold font-montserrat">
          Coming Soon
        </div>
        <div className="font-montserrat font-bold text-white dark:text-white">
          This page is currently a work in progress. Please check back later!
        </div>
        <br />
        <Link href="/" passHref>
          <button className="ml-5 px-3 py-2 inline-block drop-shadow-xl dark:drop-shadow-none text-light-300 pl-4 border border-solid border-main-500 bg-main-600 hover:bg-main-700 font-semibold rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
