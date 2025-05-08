import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bell } from "lucide-react";

const PosNotification = () => {
  const notificationCount = 5;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-5" />
          {notificationCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">New order received</span>
            <span className="text-sm text-muted-foreground">
              Table 5 - Order #1234
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">Table maintenance completed</span>
            <span className="text-sm text-muted-foreground">
              Table 3 is now available
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex flex-col">
            <span className="font-medium">Reservation reminder</span>
            <span className="text-sm text-muted-foreground">
              Table 8 reserved for 7:00 PM
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PosNotification;
