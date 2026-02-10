import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SystemAdminMenu } from "@/components/systemadminmenu";

export default function SystemAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SystemAdminMenu />
      <SidebarInset>
        <div className="flex min-h-screen bg-background">
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


