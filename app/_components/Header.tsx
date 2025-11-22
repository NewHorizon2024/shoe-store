"use server";

import HeaderLogo from "./HeaderLogo";
import Nav from "./Nav";

export default async function Header() {
  return (
    <div className="flex justify-between items-center">
      <HeaderLogo />
      <Nav />
      <div>Control</div>
    </div>
  );
}
