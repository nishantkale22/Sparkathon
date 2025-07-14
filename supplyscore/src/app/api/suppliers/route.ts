import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { name, contactEmail } = await req.json();
        if (!name || !contactEmail) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        const supplier = await prisma.supplier.create({
            data: { name, contactEmail },
        });
        return NextResponse.json(supplier, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add supplier" }, { status: 500 });
    }
} 