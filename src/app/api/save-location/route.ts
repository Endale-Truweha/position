import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ only once
    const { latitude, longitude } = body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { message: "Invalid or missing latitude/longitude" },
        { status: 400 }
      );
    }

    console.log("User Location:", latitude, longitude);
    console.log("Full Data Received:", body);

    // TODO: Save to database using Prisma or another method

    return NextResponse.json(
      { message: "Location saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving location:", error);
    return NextResponse.json(
      { message: "Error saving location" },
      { status: 500 }
    );
  }
}
