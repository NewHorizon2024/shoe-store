"use client";

import { useDeleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {IconLogout} from '@tabler/icons-react'
import { Button } from "@/components/ui/button";

export default function MainNav() {
  const deleteCookie = useDeleteCookie();
  const router = useRouter();

  function handleLogout() {
    try {
      deleteCookie("token");
      setTimeout(() => router.push("/login"), 0);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <nav className="flex flex-row-reverse bg-gray-100 h-fit py-2 layout font-[nunito-light]">
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="cursor-pointer hover:text-gray-400"
      >
        Logout
        <IconLogout />
      </Button>
    </nav>
  );
}
