"use client";
import * as React from "react";

export function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
    const [show, setShow] = React.useState(false);
    let timeout: NodeJS.Timeout;

    function handleMouseEnter() {
        timeout = setTimeout(() => setShow(true), 100);
    }
    function handleMouseLeave() {
        clearTimeout(timeout);
        setShow(false);
    }

    return (
        <span className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            tabIndex={0}
            aria-describedby="tooltip"
        >
            {children}
            {show && (
                <span
                    id="tooltip"
                    role="tooltip"
                    className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-black text-white text-xs shadow-lg whitespace-nowrap"
                >
                    {content}
                </span>
            )}
        </span>
    );
} 