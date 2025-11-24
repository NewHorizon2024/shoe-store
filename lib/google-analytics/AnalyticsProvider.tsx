"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import * as gtag from "./gtag";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null;
}
