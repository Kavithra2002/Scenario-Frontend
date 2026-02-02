"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname() ?? "";

  const currentUserType = (() => {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) return "Admin";
    if (pathname === "/system-admin" || pathname.startsWith("/system-admin/"))
      return "System Admin";
    if (pathname === "/authorizer" || pathname.startsWith("/authorizer/"))
      return "Authorizer";
    if (pathname === "/user" || pathname.startsWith("/user/")) return "User";
    return "User";
  })();

  const currentInitials = (() => {
    switch (currentUserType) {
      case "System Admin":
        return "SA";
      case "Authorizer":
        return "AU";
      case "Admin":
        return "AD";
      case "User":
      default:
        return "U";
    }
  })();

  const items = [
    { label: "User", href: "/user" },
    { label: "Admin", href: "/admin" },
    { label: "System Admin", href: "/system-admin" },
    { label: "Authorizer", href: "/authorizer" },
  ] as const;

  return (
    <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="flex w-full items-center justify-between px-3 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
            AMBEON
          </h1>
        </div>
        <div className="flex items-center gap-2 ml-auto pr-4">
          <Badge
            variant="secondary"
            className="hidden sm:inline-flex select-none"
          >
            {currentUserType}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors">
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {currentInitials}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {items.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "cursor-pointer",
                      item.label === currentUserType && "font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

