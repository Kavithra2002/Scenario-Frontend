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
  Users,
  Plug,
  Bell,
  User,
  Lock,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { name: "User List", path: "/system-admin/user-list", icon: Users },
  { name: "Application Integration", path: "/system-admin/application-integration", icon: Plug },
  { name: "Notification", path: "/system-admin/notification", icon: Bell },
  { name: "Account", path: "/system-admin/account", icon: User },
  { name: "Security", path: "/system-admin/security", icon: Lock },
  { name: "Help Center", path: "/system-admin/help-center", icon: HelpCircle },
];

export function SystemAdminMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/system-admin/user-list") {
      return pathname === "/system-admin" || pathname === "/system-admin/user-list";
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
                if (item.path === "/system-admin/help-center") {
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

