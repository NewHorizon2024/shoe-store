"use client";

import { deleteCookie } from "@/actions/deleteCookies";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function MainNav() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await deleteCookie();
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
