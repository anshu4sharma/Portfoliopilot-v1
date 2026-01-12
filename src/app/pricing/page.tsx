import { Suspense } from "react";
import PricingContent from "./_components/pricing-content";
import { getCurrentUser } from "@/lib/session";
import { getUserEmailAndName } from "@/data-access/profiles";
import PricingContentSkeleton from "./_components/pricing-content-skeleton";
import { redirect } from "next/navigation";

export default async function PricingPage() {
  const user = await getCurrentUser();
  if (user && user?.userType !== "free") redirect("/dashboard");
  const userNameAndEmail = await getUserEmailAndName(user?.id ?? 0);
  return (
    <Suspense fallback={<PricingContentSkeleton />}>
      <PricingContent user={user} userNameAndEmail={userNameAndEmail} />
    </Suspense>
  );
}
