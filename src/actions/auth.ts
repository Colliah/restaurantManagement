"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signInWithCredential = async (
  values: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            success: false,
            error: "Invalid credentials",
          };
        }

        default: {
          return {
            success: false,
            error: "Something went wrong!",
            message: error.message,
          };
        }
      }
    }

    return {
      success: false,
      error: "Something went wrong!",
      message: error,
    };
  }
};

export const signOutCredentials = async () => {
  await signOut({
    redirectTo: "/sign-in",
  });
};
