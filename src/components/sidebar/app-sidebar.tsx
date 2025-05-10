"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  NotebookTabs,
  CookingPot,
  ChefHat,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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
      title: "Recipes",
      url: "/admin/recipes",
      icon: NotebookTabs,
      isActive: true,
      items: [
        {
          title: "Manage",
          url: "/admin/recipes",
        },
      ],
    },
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
      title: "Food",
      url: "#",
      icon: ChefHat,
      isActive: true,
      items: [
        {
          title: "Manage",
          url: "/admin/food/",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
