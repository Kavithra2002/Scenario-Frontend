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
  BarChart3,
  TrendingUp,
  RefreshCw,
  Settings,
  ShoppingCart,
  CheckSquare,
  Bell,
  User,
  Lock,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { name: "Financial View", path: "/user/financial-view", icon: BarChart3 },
  { name: "Scenario Analysis", path: "/user/scenario-analysis", icon: TrendingUp },
  { name: "Scenario Management", path: "/user/scenario-management", icon: RefreshCw },
  { name: "Report Management", path: "/user/report-management", icon: Settings },
  { name: "Market", path: "/user/market", icon: ShoppingCart },
  { name: "Task Management", path: "/user/task-management", icon: CheckSquare },
  { name: "Notification", path: "/user/notification", icon: Bell },
  { name: "Account", path: "/user/account", icon: User },
  { name: "Security", path: "/user/security", icon: Lock },
  { name: "Help Center", path: "/user/help-center", icon: HelpCircle },
];

export function UserMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/user/financial-view") {
      return pathname === "/user" || pathname === "/user/financial-view";
    }
    // For routes with sub-routes (like Market), check if pathname starts with the path
    if (path === "/user/market") {
      return pathname === path || pathname?.startsWith(path + "/");
    }
    // For other routes, check exact match
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
                if (item.path === "/user/help-center") {
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


