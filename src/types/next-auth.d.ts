import "next-auth";
import { UserRole } from "@/types/user";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}
