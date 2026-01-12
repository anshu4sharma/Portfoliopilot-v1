import { getCurrentUser } from "@/lib/session";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { createPayment } from "@/actions/payments-actions";
import { updateUserTypeToPro } from "@/actions/user-actions";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.userType !== "free") {
      return NextResponse.json(
        { error: "User already has a pro subscription" },
        { status: 400 },
      );
    }

    const requestBody = await request.json();
    const { paymentId, amount, currency, phoneNo, email, name, userId } =
      requestBody;

    // Validate required fields
    if (!paymentId || !amount || !currency || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const updatedUser = await updateUserTypeToPro(user.id);
    const payment = await createPayment({
      userId,
      amount,
      currency,
      status: "successful",
      paymentId,
      paymentMethod: "razorpay",
      userPhoneNo: phoneNo,
      userEmail: email,
      userName: name,
      timeZone: "UTC", // Or pass from client
    });

    return NextResponse.json({
      message: "Payment successful and user updated",
      payment,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 },
    );
  }
}
