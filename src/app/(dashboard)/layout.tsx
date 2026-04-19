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
        <div className="hidden lg:flex  bg-[rgba(8,11,20,0.85)]">
          <Sidebar />
        </div>
        {/* <MobileSidebar /> */}
          <div className="flex flex-col flex-1 bg-[rgba(8,11,20,0.85)]">
        <Topbar />
        <main className="flex-1 p-6  overflow-y-auto bg-[#295f47]"  >
          {children}
          
        </main>
        </div>
      </div>
  );
}