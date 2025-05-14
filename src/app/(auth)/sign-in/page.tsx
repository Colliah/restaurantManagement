import { auth } from "@/auth";
import SignInForm from "@/components/form/signin-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return <SignInForm />;
}
