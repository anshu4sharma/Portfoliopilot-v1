import { signOutAction } from "@/actions/sign-out";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }
  signOutAction()
  redirect("/signed-out");
}
