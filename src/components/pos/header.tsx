"use client";

import { Maximize, Minimize, Search } from "lucide-react";
import { Input } from "../ui/input";
import PosNotification from "./pos-notification";
import { Button } from "../ui/button";
import { useState } from "react";

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable full-screen mode: ${e.message}`
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
    <header className="border-b bg-background z-10 flex-shrink-0">
      <div className="flex h-16 items-center px-4 md:px-6">
        <h1 className="text-xl font-semibold">POS</h1>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative flex items-center">
            <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
        </div>
      </div>
    </header>
  );
};

export default Header;
