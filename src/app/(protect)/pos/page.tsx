import { auth } from "@/auth";
import PosSystem from "@/components/pos/pos-system";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "POS",
  description: "Point of Sale system to manage orders and customers.",
};

export default async function PosPage() {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }
  return <PosSystem />;
}
