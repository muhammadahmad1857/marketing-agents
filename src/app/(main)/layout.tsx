import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/main/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ">
        <div className="md:hidden flex justify-between items-start p-4 ">
          <SidebarTrigger />
          <Link href="/" className={`transition-opacity duration-200 `}>
            <h1 className="text-3xl font-bold m-b-2">Kognifi.ai</h1>
          </Link>
          <Separator orientation="vertical" className={`mr-2 h-full `} />
        </div>
        <div className=" w-full"> {children}</div>
      </main>
    </SidebarProvider>
  );
}
