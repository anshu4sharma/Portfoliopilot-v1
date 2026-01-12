import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getCurrentUser } from "@/lib/session";
import { PRICING } from "@/config/pricing";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const requestBody = await request.json();
    const { billingCycle } = requestBody;

    if (
      !billingCycle ||
      (billingCycle !== "monthly" && billingCycle !== "yearly")
    ) {
      return NextResponse.json(
        { error: "Invalid billing cycle" },
        { status: 400 },
      );
    }

    const billingCycleKey = billingCycle.toUpperCase() as "MONTHLY" | "YEARLY";
    const pricing = PRICING[billingCycleKey];

    // Create a plan
    const plan = await razorpay.plans.create({
      period: billingCycle === "monthly" ? "monthly" : "yearly",
      interval: 1,
      item: {
        name: `portfoliopilot.in ${billingCycle} Pro Plan`,
        amount: parseInt(pricing.OFFER_PRICE) * 100,
        currency: "INR",
        description: `${billingCycle} subscription to portfoliopilot.in Pro features`,
      },
    });

    // Create a subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.id,
      customer_notify: 1,
      quantity: 1,
      total_count: 12, // Number of billing cycles
      notes: {
        userId: user.id.toString(),
        billingCycle,
      },
    });

    return NextResponse.json({
      subscription,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error in subscription API:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 },
    );
  }
}
