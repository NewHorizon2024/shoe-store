"use client";

import { CREATE_USER } from "@/app/api/routes";
import type { SignupForm } from "@/models/models";
import type { SignupResponse  } from "@/models/types";
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (payload: SignupForm) => {
      const response = await axios.post(CREATE_USER, payload);
      const result = response.data as SignupResponse ;
      return result;
    },
  });

  async function onSubmit(data: FormData) {
    mutateAsync(data)
      .then(({ error, response, reason }) => {
        if (error && reason === "User already exits")
          toast.error(
            "This email is already registered. Please use a different one.",
          );

        if (response) {
          toast.success("User created successfully, you can login now!");
          router.push("/login");
        }
      })
      .catch(() => toast.error("Failed to create user. Please try again."));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 md:flex-nowrap"
    >
      <div>
        <Input
          {...register("firstName")}
          placeholder="First Name"
          type="text"
          required
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...register("lastName")}
          placeholder="Last Name"
          type="text"
          required
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("email")}
          placeholder="Email"
          type="email"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="cursor-pointer mt-4 flex items-center"
      >
        Sign up
        {isPending && <IconLoader2 className="mt-1 rotate-icon" />}
      </Button>
    </form>
  );
}
