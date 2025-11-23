"use server";

import { type ReactNode } from "react";

import HeaderLogo from "./HeaderLogo";

type HeaderProps = Readonly<{
  productNav?: ReactNode;
}>;
export default async function Header({ productNav }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <HeaderLogo />
      {productNav}
      <div>Control</div>
    </div>
  );
}
