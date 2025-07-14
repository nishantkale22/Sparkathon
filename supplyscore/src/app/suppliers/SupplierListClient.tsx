"use client";
import AddSupplierForm from "./AddSupplierForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

export default function SupplierListClient({ suppliers: initialSuppliers }: { suppliers: any[] }) {
    const [suppliers, setSuppliers] = useState(initialSuppliers);

    async function refreshSuppliers() {
        const res = await fetch("/api/suppliers-list");
        if (res.ok) {
            const data = await res.json();
            setSuppliers(data);
        }
    }

    return (
        <div>
            <AddSupplierForm onSupplierAdded={refreshSuppliers} />
            <h1 className="text-2xl font-bold mb-6">Suppliers</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.contactEmail}</TableCell>
                            <TableCell>{new Date(supplier.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 