import Link from "next/link";

import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center min-h-screen px-4 pt-20">
      <div className="w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h6 className="text-center text-gray-600 mb-6 font-[nunito-bold] tracking-tight">
          Log in to access your account and explore new arrivals.
        </h6>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
