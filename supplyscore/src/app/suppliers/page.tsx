import { prisma } from "@/lib/prisma";
import SupplierListClient from "./SupplierListClient";
import React from "react";

export default async function SupplierListPage() {
    const suppliers = await prisma.supplier.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-8">
            <SupplierListClient suppliers={suppliers} />
        </div>
    );
} 