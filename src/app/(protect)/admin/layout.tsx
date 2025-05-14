import { auth } from "@/auth";
import Header from "@/components/pos/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar className="bg-card" />
      <main className="w-full">
        <Header />
        <div className="p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
