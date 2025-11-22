"use server";

import Link from "next/link";

export default async function Nav() {
  return (
    <nav className="flex gap-4 font-[nunito-bold]">
      <Link href="">Men</Link>
      <Link href="">Women</Link>
      <Link href="">Kids</Link>
      <Link href="">Sports</Link>
    </nav>
  );
}
