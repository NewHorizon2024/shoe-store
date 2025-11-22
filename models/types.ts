export type LoginActionResponse = Readonly<{
  response: { id: number }[] | null;
  error?: boolean;
  reason?: string;
}>;
