"use server";

import { type ReactNode } from "react";

import HeaderLogo from "./HeaderLogo";

type HeaderProps = Readonly<{
  productNav?: ReactNode;
  productCart?: ReactNode;
}>;
export default async function Header({ productNav, productCart }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <HeaderLogo />
      {productNav}
      {productCart}
    </div>
  );
}
