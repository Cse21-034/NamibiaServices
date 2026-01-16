import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const promotions = await prisma.promotion.findMany({
      include: {
        business: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(promotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, discount, expiryDate, image, userEmail } = body;

    if (!title || !description || !discount || !expiryDate || !userEmail) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        businesses: true,
      },
    });

    if (!user || !user.businesses || user.businesses.length === 0) {
      return new NextResponse("User or business not found", { status: 404 });
    }

    const newPromotion = await prisma.promotion.create({
      data: {
        title,
        description,
        discount,
        image: image || null, // Store the image (base64 or null)
        expiryDate: new Date(expiryDate),
        businessId: user.businesses[0].id,
      },
    });

    return NextResponse.json(newPromotion, { status: 201 });
  } catch (error) {
    console.error("Error creating promotion:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
