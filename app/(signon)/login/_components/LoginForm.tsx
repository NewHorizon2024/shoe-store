/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";

import type { LoginForm } from "@/models/models";
import type { LoginResponse } from "@/models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setCookie } from "cookies-next";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
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
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const { mutateAsync: googleMutate } = useMutation({
    mutationKey: ["GOOGLE_USER"],
    mutationFn: async (payload: {
      name: string;
      email: string;
      token: string;
    }) => {
      const response = await axios.post("/api/auth-google", {
        name: payload.name,
        email: payload.email,
        token: payload.token,
      });

      return response.data;
    },
    onSuccess: () => {
      setCookie("token", data?.accessToken);
    },
  });

  useEffect(() => {
    if (
      status === "authenticated" &&
      data?.user?.name &&
      data?.user?.email &&
      data?.accessToken
    ) {
      googleMutate({
        name: data.user.name,
        email: data.user.email,
        token: data.accessToken,
      }).then(() => router.push("/"));
    }
  }, [status, data]);

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
  });

  function onSubmit(data: LoginForm) {
    mutateAsync(data)
      .then((response) => {
        if (response.error) {
          if (response.reason === "User Not Found") {
            toast.error("We couldn’t find an account with that email.");
          } else if (response.reason === "Invalid credentials") {
            toast.error("The email or password you entered is incorrect.");
          } else {
            toast.error("Login failed, please try again later!");
          }
          return;
        }

        if (response.id) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unexpected error, please try again later!");
      });
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Button
            disabled={isPending || status === "loading"}
            type="submit"
            className="cursor-pointer w-full"
          >
            Login
            {isPending && <IconLoader2 className="mt-1 rotate-icon" />}
          </Button>
        </div>
      </form>

      <Button
        disabled={isPending || status === "loading"}
        className="cursor-pointer w-full mt-4"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
