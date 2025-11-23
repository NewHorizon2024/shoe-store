import SignupForm from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex justify-center min-h-screen px-4 pt-20">
      <div className="w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h6 className="text-center text-gray-600 mb-6 font-[nunito-bold] tracking-tight">
          Sign up to start shopping and discover the latest arrivals.
        </h6>
        <SignupForm />
      </div>
    </div>
  );
}
