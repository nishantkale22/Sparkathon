"use client";
import AddDeliveryForm from "./AddDeliveryForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import Analytics from "./Analytics";
import { saveAs } from "file-saver";

function toCsvRow(fields: any[]) {
    return fields.map(f => `"${String(f).replace(/"/g, '""')}"`).join(",");
}

function exportDeliveriesToCsv(deliveries: any[]) {
    const header = ["Delivery Date", "Expected Date", "Quality Score", "Compliant?"];
    const rows = deliveries.map(d => [
        new Date(d.deliveryDate).toLocaleDateString(),
        new Date(d.expectedDate).toLocaleDateString(),
        d.qualityScore,
        d.isCompliant ? "Yes" : "No"
    ]);
    const csv = [toCsvRow(header), ...rows.map(toCsvRow)].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `deliveries-${new Date().toISOString().slice(0, 10)}.csv`);
}

export default function DeliveryListClient({ supplier, initialDeliveries }: { supplier: any, initialDeliveries: any[] }) {
    const [deliveries, setDeliveries] = useState(initialDeliveries);

    async function refreshDeliveries() {
        const res = await fetch(`/api/suppliers/${supplier.id}/deliveries-list`);
        if (res.ok) {
            const data = await res.json();
            setDeliveries(data);
        }
    }

    return (
        <div>
            <AddDeliveryForm supplierId={supplier.id} onDeliveryAdded={refreshDeliveries} />
            <Analytics deliveries={deliveries} />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Deliveries for {supplier.name}</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => exportDeliveriesToCsv(deliveries)}
                >
                    Export CSV
                </button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Expected Date</TableHead>
                        <TableHead>Quality Score</TableHead>
                        <TableHead>Compliant?</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                            <TableCell>{new Date(delivery.deliveryDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(delivery.expectedDate).toLocaleDateString()}</TableCell>
                            <TableCell>{delivery.qualityScore}</TableCell>
                            <TableCell>{delivery.isCompliant ? "Yes" : "No"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 