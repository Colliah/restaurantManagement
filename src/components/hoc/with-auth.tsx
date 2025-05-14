import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export type WithAuthProps = {
  session: Session | null;
};

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>,
  ) {
    const session = await auth();

    if (!session) {
      return redirect("/signin");
    }

    return <WrappedComponent {...(props as P)} session={session} />;
  };
}
