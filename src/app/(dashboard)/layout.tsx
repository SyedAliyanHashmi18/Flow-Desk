import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
// import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        {/* <MobileSidebar /> */}
          <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 bg-muted/40 overflow-y-auto ">
          {children}
          
        </main>
        </div>
      </div>
  );
}