import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminMenu } from "@/components/adminmenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminMenu />
      <SidebarInset>
        <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


