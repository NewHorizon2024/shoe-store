"use client";

import { type ReactNode } from "react";

import { ToastContainer, Zoom } from "react-toastify";

type MacroLayoutProps = Readonly<{
  children: ReactNode;
}>;
export default function MacroLayout({ children }: MacroLayoutProps) {
  return (
    <div className="min-h-screen layout flex flex-col gap-4">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Zoom}
      />
      {children}
    </div>
  );
}
