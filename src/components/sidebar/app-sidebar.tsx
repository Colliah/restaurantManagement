"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  NotebookTabs,
  CookingPot,
  ChefHat,
  ClipboardList,
  DollarSign,
  CalendarDays,
  Armchair,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    // {
    //     name: "Acme Corp.",
    //     logo: AudioWaveform,
    //     plan: "Startup",
    // },
    // {
    //     name: "Evil Corp.",
    //     logo: Command,
    //     plan: "Free",
    // },
  ],
  navMain: [
    {
      label: "Menu Management",
      children: [
        {
          title: "Ingredients",
          url: "#",
          icon: CookingPot,
          isActive: true,
          items: [
            {
              title: "Manage",
              url: "/admin/ingredients/",
            },
          ],
        },
        {
          title: "Recipes",
          url: "/admin/recipes",
          icon: NotebookTabs,
          isActive: false,
          items: [
            {
              title: "Manage",
              url: "/admin/recipes",
            },
          ],
        },

        {
          title: "Food",
          url: "#",
          icon: ChefHat,
          isActive: false,
          items: [
            {
              title: "Manage",
              url: "/admin/food/",
            },
          ],
        },
      ],
    },
    {
      label: "Order Management",
      children: [
        {
          title: "Orders",
          url: "#",
          icon: ClipboardList,
          isActive: false,
          items: [
            {
              title: "Manage orders",
              url: "/admin/orders/",
            },
          ],
        },
        {
          title: "Payments",
          url: "#",
          icon: DollarSign,
          isActive: false,
          items: [
            {
              title: "Manage",
              url: "/admin/payments/",
            },
          ],
        },
      ],
    },
    {
      label: "Reservation Management",
      children: [
        {
          title: "Reservations",
          url: "#",
          icon: CalendarDays,
          isActive: false,
          items: [
            {
              title: "Manage reservations",
              url: "/admin/reservations/",
            },
          ],
        },
        {
          title: "Tables",
          url: "#",
          icon: Armchair,
          isActive: false,
          items: [
            {
              title: "Manage tables",
              url: "/admin/tables/",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="hide-scrollbar">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
