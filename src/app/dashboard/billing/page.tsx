import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { getPaymentHistory } from "@/actions/payments-actions";

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const paymentHistory = await getPaymentHistory(user.id);


  return (
    <div className="container space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your payment details
        </p>
      </div>
      {/* <p>
        {JSON.stringify(paymentHistory)}
      </p> */}

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {new Date(payment?.createdAt ?? "").toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) ?? "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.currency} -
                      <span className="font-medium"> {payment.amount}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm capitalize text-green-500">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
