export type SignupResponse = Readonly<{
  response: { id: number }[] | null;
  error?: boolean;
  reason?: string;
}>;

export type LoginResponse = Pick<SignupResponse, "error" | "reason"> &
  Readonly<{
    success: boolean;
    userId: number;
    token?: string;
  }>;
