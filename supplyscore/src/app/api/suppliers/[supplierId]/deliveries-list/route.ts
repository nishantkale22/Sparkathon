import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ supplierId: string }> }) {
    const { supplierId } = await params;
    const deliveries = await prisma.delivery.findMany({
        where: { supplierId },
        orderBy: { deliveryDate: "desc" },
    });
    return NextResponse.json(deliveries);
} 