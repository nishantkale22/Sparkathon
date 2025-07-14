import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ supplierId: string }> }) {
    const { supplierId } = await params;
    try {
        const { deliveryDate, expectedDate, qualityScore, isCompliant } = await req.json();
        if (!deliveryDate || !expectedDate || typeof qualityScore !== "number" || typeof isCompliant !== "boolean") {
            return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
        }
        const delivery = await prisma.delivery.create({
            data: {
                supplierId,
                deliveryDate: new Date(deliveryDate),
                expectedDate: new Date(expectedDate),
                qualityScore,
                isCompliant,
            },
        });
        return NextResponse.json(delivery, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add delivery" }, { status: 500 });
    }
} 