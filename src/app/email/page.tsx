import React from "react";
import UserManagement from "./user-management";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = {};

export default async function Email({}: Props) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "moderator")) {
    redirect("/");
  }

  return <UserManagement />;
}
