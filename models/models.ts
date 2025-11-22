export type SignupForm = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>;

export type LoginForm = Pick<SignupForm, "email" | "password">;
