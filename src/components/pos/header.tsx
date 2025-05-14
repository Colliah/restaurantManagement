"use client";

import { AlignStartVertical, Maximize, Minimize, Search } from "lucide-react";
import { Input } from "../ui/input";
import PosNotification from "./pos-notification";
import { Button } from "../ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AppSidebar } from "../sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import PosSettings from "./pos-settings";
import { ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";

interface HeaderProps {
  isPOS?: boolean;
}

const Header = ({ isPOS = false }: HeaderProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable full-screen mode: ${e.message}`,
        );
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="z-10 flex-shrink-0 border-b bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        {isPOS ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <AlignStartVertical />
              </Button>
            </SheetTrigger>
            <SheetContent buttonClose={false} side="left" className="w-[16rem]">
              <SidebarProvider>
                <AppSidebar
                  className="bg-card"
                  variant="inset"
                  collapsible="none"
                />
              </SidebarProvider>
            </SheetContent>
          </Sheet>
        ) : (
          <SidebarTrigger />
        )}
        <h1 className="ml-2 text-xl font-semibold">POS</h1>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-[200px] pl-8 md:w-[300px]"
              placeholder="Search"
              type="search"
            />
          </div>

          <PosNotification />

          <Button variant="outline" size="icon" onClick={toggleFullScreen}>
            {isFullScreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle fullscreen</span>
          </Button>

          <PosSettings />

          <ClerkLoading>
            <div className="size-8 animate-pulse rounded-full bg-muted"></div>
          </ClerkLoading>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
