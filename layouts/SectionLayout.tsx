"use server";

import { type ReactNode } from "react";

type SectionLayoutProps = Readonly<{
  children: ReactNode;
}>;
export default async function SectionLayout({ children }: SectionLayoutProps) {
  return <section>{children}</section>;
}
