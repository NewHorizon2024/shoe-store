export type SignupForm = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>;

export type LoginForm = Pick<SignupForm, "email" | "password">;

export type Product = Readonly<{
  id: number;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  video_url: string;
}>;
