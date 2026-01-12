import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import PortfolioPage from "./portfolio/page";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <PortfolioPage />
    </div>
  );
}
