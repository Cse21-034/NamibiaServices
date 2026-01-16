import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    console.log(`Attempting to fetch business with slug: ${slug}`);

    const business = await prisma.business.findUnique({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
      include: {
        category: true,
        photos: {
          orderBy: { isPrimary: 'desc' }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        businessHours: {
          orderBy: { dayOfWeek: 'asc' }
        },
      },
    });

    if (!business) {
      console.log(`Business with slug ${slug} not found or not published.`);
      return NextResponse.json(
        { 
          success: false,
          error: "Business not found" 
        }, 
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.business.update({
      where: { id: business.id },
      data: { viewCount: { increment: 1 } }
    });

    return NextResponse.json({
      success: true,
      business
    });

  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Unable to load business" 
      }, 
      { status: 500 }
    );
  }
}