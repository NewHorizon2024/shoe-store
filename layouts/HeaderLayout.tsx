"use server";

import { type ReactNode } from "react";

type HeaderLayoutProps = Readonly<{
  children: ReactNode;
}>;
export default async function HeaderLayout({ children }: HeaderLayoutProps) {
  return <header className="layout bg-white">{children}</header>;
}
