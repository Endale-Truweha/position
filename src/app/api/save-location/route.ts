import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ only once
    const { latitude, longitude,slug } = body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { message: "Invalid or missing latitude/longitude" },
        { status: 400 }
      );
    }

    console.log("User Location:", latitude, longitude,slug);
    console.log("Full Data Received:", body);

    // TODO: Save to database using Prisma or another method

   await prisma.location.upsert({
    where: { TTnumber: slug },
    update: {
      latitude,
      longitude,
    },
    create: {
      TTnumber :slug,
      latitude,
      longitude,
    },
  });

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
