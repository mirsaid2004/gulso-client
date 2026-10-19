'use client'
import { useEffect, useRef } from 'react'

function MouseGlowAnimation() {
    const glowRef = useRef<HTMLDivElement>(null);

    /*NOTE: mouse-tracking glow effect*/
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!glowRef.current) return;
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, oklch(0.6067 0.2266 7.24 / 0.07), transparent 70%)`;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
        />
    )
}

export default MouseGlowAnimation