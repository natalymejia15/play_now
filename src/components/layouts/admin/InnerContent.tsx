import { SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui";
import { useMemo, type ReactNode } from "react";

export function InnerContent({ children }: { children: ReactNode }) {
  const { state, isMobile } = useSidebar();

  const SIDEBAR_OPEN_WIDTH = "14rem";
  const SIDEBAR_ICON_WIDTH = "3rem";

  const marginLeft = useMemo(() => {
    if (isMobile) return "0";
    return state === "expanded" ? SIDEBAR_OPEN_WIDTH : SIDEBAR_ICON_WIDTH;
  }, [state, isMobile]);

  return (
    <SidebarInset
      className="flex flex-col flex-1 transition-all duration-300 bg-white"
      style={{ marginLeft, minHeight: "100vh" }}
    >
      <header className="h-16 border-b border-green-200 flex items-center px-6 bg-white sticky top-0 z-10">
        <SidebarTrigger className="text-green-700 hover:text-green-900 transition-colors" />
        <h1 className="ml-4 text-lg font-semibold text-green-900">
          Panel de Administración
        </h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </SidebarInset>
  );
}