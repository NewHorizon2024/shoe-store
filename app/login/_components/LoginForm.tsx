"use client";

import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <Form
      action=""
      className="flex w-full flex-wrap md:flex-nowrap gap-4 flex-col"
    >
      <Input required type="email" placeholder="Email" />
      <Input required type="password" placeholder="Password" />
      <Button type="submit" className="cursor-pointer mt-4">Login</Button>
    </Form>
  );
}
