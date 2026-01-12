import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const { to, subject, body } = await req.json();
    // await sendEmail(to, subject, body);
    // return NextResponse.json({ message: "Email sent" });
    return NextResponse.json({ message: "Send email testing" });
  } catch (error) {
    console.error("Error in sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
