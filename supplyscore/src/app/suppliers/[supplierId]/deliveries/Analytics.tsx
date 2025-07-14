"use client";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Analytics({ deliveries }: { deliveries: any[] }) {
    if (!deliveries.length) return <div className="mb-8">No deliveries yet for analytics.</div>;

    // Sort by deliveryDate ascending
    const sorted = [...deliveries].sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime());
    const labels = sorted.map(d => new Date(d.deliveryDate).toLocaleDateString());
    const qualityScores = sorted.map(d => d.qualityScore);
    const compliance = sorted.map(d => d.isCompliant ? 1 : 0);

    // Calculate averages
    const avgQuality = (qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length).toFixed(1);
    const complianceRate = (compliance.reduce((a, b) => a + b, 0) / compliance.length * 100).toFixed(1);

    const data = {
        labels,
        datasets: [
            {
                label: "Quality Score",
                data: qualityScores,
                borderColor: "#2563eb",
                backgroundColor: "#2563eb33",
                yAxisID: "y",
            },
            {
                label: "Compliant (1=Yes, 0=No)",
                data: compliance,
                borderColor: "#16a34a",
                backgroundColor: "#16a34a33",
                yAxisID: "y1",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: "Delivery Performance Over Time" },
        },
        scales: {
            y: { type: "linear" as const, min: 0, max: 100, position: "left" },
            y1: { type: "linear" as const, min: 0, max: 1, position: "right", grid: { drawOnChartArea: false } },
        },
    };

    return (
        <div className="mb-8">
            <div className="mb-2 flex gap-8">
                <div>Avg. Quality Score: <span className="font-bold">{avgQuality}</span></div>
                <div>On-Time Rate: <span className="font-bold">{complianceRate}%</span></div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
} 