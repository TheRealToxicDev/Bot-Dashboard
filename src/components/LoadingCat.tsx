import Image from "next/image";
import { useState } from "react";

interface Props {
  text?: string;
}

export default function LoadingCat({ text }: Props) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center bg-main-800 ml-5 px-5 py-3 rounded-md">
      <Image
        src="/gifs/locked.gif"
        height={64}
        width={64}
        alt="Loading Cat"
      />
      <div className="font-bold text-white">
        {text ? text : `Hold up, loading...`}
      </div>
    </div>
  );
}
