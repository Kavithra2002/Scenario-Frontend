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
        <div className="flex min-h-screen bg-background">
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


