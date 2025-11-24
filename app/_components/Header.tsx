"use server";

import { type ReactNode } from "react";

import HeaderLogo from "./HeaderLogo";

type HeaderProps = Readonly<{
  productCart?: ReactNode;
}>;
export default async function Header({ productCart }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <HeaderLogo />

      {productCart}
    </div>
  );
}
