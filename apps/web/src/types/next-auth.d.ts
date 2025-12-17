import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isPaidUser?: boolean;
      subscription?: {
        id: string;
        status: string;
        startDate: Date;
        endDate: Date | null;
        planId: string;
        planName?: string;
      } | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwtToken?: string;
    isPaidUser?: boolean;
    subscription?: {
      id: string;
      status: string;
      startDate: Date;
      endDate: Date | null;
      planId: string;
      planName?: string;
    } | null;
  }
} 