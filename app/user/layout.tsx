import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/usermenu";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserMenu />
      <SidebarInset>
        <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

