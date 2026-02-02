import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthorizerMenu } from "@/components/authorizermenu";

export default function AuthorizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthorizerMenu />
      <SidebarInset>
        <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


