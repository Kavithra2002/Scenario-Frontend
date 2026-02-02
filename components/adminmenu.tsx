"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  CheckSquare,
  User,
  Settings,
  Lock,
  Bell,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { name: "Task Management", path: "/admin/task-management", icon: CheckSquare },
  { name: "Account", path: "/admin/account", icon: User },
  { name: "Settings", path: "/admin/settings", icon: Settings },
  { name: "Notification", path: "/admin/notification", icon: Bell },
  { name: "Security", path: "/admin/security", icon: Lock },
  { name: "Help Center", path: "/admin/help-center", icon: HelpCircle },
];

export function AdminMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin/task-management") {
      return pathname === "/admin" || pathname === "/admin/task-management";
    }
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Main Navigation Items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                if (item.path === "/admin/help-center") {
                  return [
                    <SidebarMenuItem key={`${item.path}-separator`}>
                      <SidebarSeparator />
                    </SidebarMenuItem>,
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        tooltip={item.name}
                      >
                        <Link href={item.path}>
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>,
                  ];
                }

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      tooltip={item.name}
                    >
                      <Link href={item.path}>
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

