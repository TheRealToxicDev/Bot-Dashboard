import clsx from "clsx";
interface Props {
  link: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}
import Image from "next/image";

export function Avatar({ link, width, height, alt, className }: Props) {
  return (
    <Image
      src={`${link}`}
      alt={alt || "Logo"}
      width={width}
      height={height}
      className={className || "w-8 rounded-full"}
    />
  );
}
