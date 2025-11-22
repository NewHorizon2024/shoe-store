"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activePath = "text-gray-400 cursor-default";
const nonActivePath = "text-black cursor-pointer";

export default function TopNav() {
  const pathName = usePathname();
  return (
    <nav className="flex flex-row-reverse bg-gray-100 h-fit py-2 layout font-[nunito-light]">
      <Link
        href="/login"
        className={clsx(
          "px-4 border-l border-gray-300 hover:text-gray-400",
          pathName.includes("login") ? activePath : nonActivePath,
        )}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={clsx(
          "px-4 hover:text-gray-400",
          pathName.includes("signup") ? activePath : nonActivePath,
        )}
      >
        Join us
      </Link>
    </nav>
  );
}
