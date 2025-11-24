export type SignupForm = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>;

export type LoginForm = Pick<SignupForm, "email" | "password">;

export type Product = Readonly<{
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  video_url: string;
}>;

export type CartPayLoad = Readonly<{
  userId: number;
  productId: number;
  quantity: number;
}>;

export type Cart = Readonly<{
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
}>;
