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
  { name: "Task Management", path: "/authorizer/task-management", icon: CheckSquare },
  { name: "Account", path: "/authorizer/account", icon: User },
  { name: "Settings", path: "/authorizer/settings", icon: Settings },
  { name: "Notification", path: "/authorizer/notification", icon: Bell },
  { name: "Security", path: "/authorizer/security", icon: Lock },
  { name: "Help Center", path: "/authorizer/help-center", icon: HelpCircle },
];

export function AuthorizerMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/authorizer/task-management") {
      return pathname === "/authorizer" || pathname === "/authorizer/task-management";
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
                if (item.path === "/authorizer/help-center") {
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

