"use client";

import type { LoginForm } from "@/models/models";
import type { LoginResponse } from "@/models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (payload: LoginForm) => {
      const response = await axios.post(`/api/user-login`, payload);
      const result = response.data as LoginResponse;
      return result;
    },
    onSuccess: () => router.push("/")
  });

  function onSubmit(data: LoginForm) {
    mutateAsync(data)
      .then((response) => {
        if (response.error && response.reason === "User Not Found") {
          toast.error("We couldn’t find an account with that email.");
        }
        if (response.error && response.reason === "Invalid credentials") {
          toast.error("The email or password you entered is incorrect.");
        }
        if (response.success && response.token) {
          setCookie("token", response.token);
          setCookie("userId", response.userId);
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
        router.replace("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login Failed, please try again later!");
      })
      .finally(() => router.replace("/"));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="mt-4 cursor-pointer"
      >
        Login
        {isPending && <IconLoader2 className="mt-1 rotate-icon" />}
      </Button>
    </form>
  );
}
