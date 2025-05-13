import Header from "@/components/pos/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
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
