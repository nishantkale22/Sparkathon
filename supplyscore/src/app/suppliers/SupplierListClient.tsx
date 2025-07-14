"use client";
import AddSupplierForm from "./AddSupplierForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { saveAs } from "file-saver";

function getPerformanceStats(deliveries) {
    if (!deliveries || deliveries.length === 0) return { avgQuality: null, onTimeRate: null };
    const avgQuality = deliveries.reduce((sum, d) => sum + d.qualityScore, 0) / deliveries.length;
    const onTimeCount = deliveries.filter(d => new Date(d.deliveryDate) <= new Date(d.expectedDate)).length;
    const onTimeRate = (onTimeCount / deliveries.length) * 100;
    return { avgQuality, onTimeRate };
}

function toCsvRow(fields) {
    return fields.map(f => `"${String(f).replace(/"/g, '""')}"`).join(",");
}

function exportSuppliersToCsv(suppliers, stats) {
    const header = ["Name", "Contact Email", "Created At", "Avg Quality", "On-Time Rate (%)"];
    const rows = suppliers.map(s => {
        const perf = stats[s.id] || {};
        return [
            s.name,
            s.contactEmail,
            new Date(s.createdAt).toLocaleString(),
            perf.avgQuality !== null && perf.avgQuality !== undefined ? perf.avgQuality.toFixed(1) : "-",
            perf.onTimeRate !== null && perf.onTimeRate !== undefined ? perf.onTimeRate.toFixed(0) : "-"
        ];
    });
    const csv = [toCsvRow(header), ...rows.map(toCsvRow)].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `suppliers-${new Date().toISOString().slice(0, 10)}.csv`);
}

export default function SupplierListClient({ suppliers: initialSuppliers }: { suppliers: any[] }) {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [stats, setStats] = useState({});
    const router = useRouter();

    async function refreshSuppliers() {
        const res = await fetch("/api/suppliers-list");
        if (res.ok) {
            const data = await res.json();
            setSuppliers(data);
        }
    }

    useEffect(() => {
        async function fetchStats() {
            const newStats = {};
            for (const supplier of suppliers) {
                const res = await fetch(`/api/suppliers/${supplier.id}/deliveries-list`);
                if (res.ok) {
                    const deliveries = await res.json();
                    newStats[supplier.id] = getPerformanceStats(deliveries);
                }
            }
            setStats(newStats);
        }
        fetchStats();
    }, [suppliers]);

    return (
        <div>
            <AddSupplierForm onSupplierAdded={refreshSuppliers} />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Suppliers</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => exportSuppliersToCsv(suppliers, stats)}
                >
                    Export CSV
                </button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.map((supplier) => {
                        const perf = stats[supplier.id] || {};
                        const showAlert =
                            perf.avgQuality !== null && (perf.avgQuality < 70 || perf.onTimeRate < 80);
                        return (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.contactEmail}</TableCell>
                                <TableCell>{new Date(supplier.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <button
                                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                        onClick={() => router.push(`/suppliers/${supplier.id}/deliveries`)}
                                    >
                                        View Deliveries
                                    </button>
                                    {showAlert && (
                                        <Tooltip content={`Low performance: Avg Quality ${perf.avgQuality?.toFixed(1) ?? "-"}, On-Time ${perf.onTimeRate?.toFixed(0) ?? "-"}%`}>
                                            <AlertTriangle className="text-yellow-600" />
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
} 