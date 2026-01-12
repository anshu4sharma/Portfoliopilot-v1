import { NextResponse } from "next/server";
import { manageTursoLocations } from "@/utils/turso/manage-turso";

export async function POST(request: Request) {
  try {
    // const body = await request.json();

    // only use this block when need to check secret key
    // const { secretKey } = body;
    // if (secretKey !== process.env.CRON_SECRET_KEY) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // end of secret key check block

    // const result = await manageTursoLocations();
    const result = "Hello World";
    return NextResponse.json(
      { message: "Turso locations managed successfully", result },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in manage-turso-locations route handler:", error);
    return NextResponse.json(
      { error: `Failed to manage Turso locations: ${error}` },
      { status: 500 },
    );
  }
}
