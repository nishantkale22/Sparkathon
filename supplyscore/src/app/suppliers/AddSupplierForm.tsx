"use client";
import { useState } from "react";

export default function AddSupplierForm({ onSupplierAdded }: { onSupplierAdded?: () => void }) {
    const [name, setName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/suppliers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, contactEmail }),
            });
            if (!res.ok) throw new Error("Failed to add supplier");
            setName("");
            setContactEmail("");
            if (onSupplierAdded) onSupplierAdded();
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 max-w-md">
            <h2 className="text-lg font-semibold">Add New Supplier</h2>
            <input
                type="text"
                placeholder="Supplier Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <input
                type="email"
                placeholder="Contact Email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Supplier"}
            </button>
            {error && <div className="text-red-600">{error}</div>}
        </form>
    );
} 