import { prisma } from "@/lib/prisma";
import DeliveryListClient from "./DeliveryListClient";
import { notFound } from "next/navigation";
import React from "react";

export default async function DeliveriesPage({ params }: { params: Promise<{ supplierId: string }> }) {
  const { supplierId } = await params;
  const supplier = await prisma.supplier.findUnique({
    where: { id: supplierId },
  });
  if (!supplier) return notFound();
  const deliveries = await prisma.delivery.findMany({
    where: { supplierId },
    orderBy: { deliveryDate: "desc" },
  });
  return <div className="p-8"><DeliveryListClient supplier={supplier} initialDeliveries={deliveries} /></div>;
} 