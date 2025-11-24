"use client";

import type { LoginForm } from "@/models/models";
import type { LoginResponse } from "@/models/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
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
          toast.success("Login successful!");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Unexpected error, please try again later!");
      });
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
