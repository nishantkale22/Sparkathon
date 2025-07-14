"use client";
import { useState } from "react";

export default function AddDeliveryForm({ supplierId, onDeliveryAdded }: { supplierId: string, onDeliveryAdded?: () => void }) {
    const [deliveryDate, setDeliveryDate] = useState("");
    const [expectedDate, setExpectedDate] = useState("");
    const [qualityScore, setQualityScore] = useState("");
    const [isCompliant, setIsCompliant] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/suppliers/${supplierId}/deliveries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deliveryDate, expectedDate, qualityScore: Number(qualityScore), isCompliant }),
            });
            if (!res.ok) throw new Error("Failed to add delivery");
            setDeliveryDate("");
            setExpectedDate("");
            setQualityScore("");
            setIsCompliant(true);
            if (onDeliveryAdded) onDeliveryAdded();
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 max-w-md">
            <h2 className="text-lg font-semibold">Add New Delivery</h2>
            <input
                type="date"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <input
                type="date"
                value={expectedDate}
                onChange={e => setExpectedDate(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <input
                type="number"
                min="0"
                max="100"
                placeholder="Quality Score (0-100)"
                value={qualityScore}
                onChange={e => setQualityScore(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isCompliant}
                    onChange={e => setIsCompliant(e.target.checked)}
                />
                Compliant
            </label>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Delivery"}
            </button>
            {error && <div className="text-red-600">{error}</div>}
        </form>
    );
} 