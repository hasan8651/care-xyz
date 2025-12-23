import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  // sidebar will added here
  return (
    <div className="container mx-auto px-4 py-6">
      {children}
    </div>
  );
}