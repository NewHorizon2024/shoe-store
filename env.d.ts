declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
    NEXT_PUBLIC_APP_ENV: "development" | "staging" | "production";
    NEXT_PUBLIC_API_URL: string;
    JWT_SECRET: string;
  }
}
