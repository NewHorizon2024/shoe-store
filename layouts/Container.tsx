"use client";

import { type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ContainerProps = Readonly<{
  children: ReactNode;
}>;
export default function Container({ children }: ContainerProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
