import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      createdAt?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwtToken?: string;
    createdAt?: string;
  }
} 