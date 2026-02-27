import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/src/components/admin/sidebar"; // Import sidebar yang baru dibuat
import { Bell } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar (Fixed width) */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <AdminSidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 md:pl-72 transition-all w-full">
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/60">
          <div className="flex items-center justify-between h-full px-6 md:px-8">
            {/* Left side (Breadcrumbs/Title placeholder) */}
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-medium text-gray-500">
                Panel Administrator
              </h1>
            </div>

            {/* Right side (User Actions) */}
            <div className="flex items-center gap-4">
              {/* Notification Icon (Visual Only) */}

              <div className="h-6 w-px bg-gray-200 mx-1"></div>

              <div className="flex items-center gap-3 pl-1">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-semibold text-gray-800 leading-none">
                    {user.firstName}
                  </span>
                  <span className="text-[11px] text-gray-500 leading-none mt-1">
                    Administrator
                  </span>
                </div>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 ring-2 ring-gray-100",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 py-6 px-6 md:px-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
