"use client";

import { useEffect, useRef } from "react";
import { Flower2, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Icon } from "@iconify/react";

/* ─── floating petal config ──────────────────────────────────── */
const iconsList = [
  "mdi:flower-outline",
  "mdi:prize",
  "boxicons:gift",
  "game-icons:wrapped-sweet",
];
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  icon: iconsList[i % iconsList.length],
  left: `${(i * 6.3 + 3) % 100}%`,
  size: 10 + (i % 5) * 4,
  delay: `${(i * 0.37) % 3}s`,
  duration: `${5 + (i % 4)}s`,
  rotate: i * 22,
}));

export default function NotFound() {
  const glowRef = useRef<HTMLDivElement>(null);

  /* subtle mouse-tracking glow */
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
    <div className="relative flex flex-col min-h-screen bg-[#f8f6f7] overflow-hidden font-sans">
      {/* ── mouse glow overlay ── */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
      />

      {/* ── ambient blobs ── */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none"
      />

      {/* ── floating petals ── */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {PETALS.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-[-40px] animate-float-petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            <Icon
              icon={p.icon}
              style={{
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotate}deg)`,
                color: `oklch(0.6067 0.2266 7.24 / ${
                  0.12 + (p.id % 4) * 0.06
                })`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── top nav bar ── */}
      {/* <header className="relative z-10 w-full border-b border-primary/10 bg-white/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-1.5 rounded-lg text-white transition-transform group-hover:scale-105">
                            <Flower2 className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-black text-primary tracking-tighter">
                            Gulso
                        </span>
                    </Link>
                </div>
            </header> */}

      {/* ── main content ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center">
          {/* big 404 */}
          <div className="relative inline-block mb-6 select-none">
            {/* shadow clone for depth */}
            <span
              aria-hidden
              className="absolute inset-0 text-[clamp(120px,25vw,200px)] font-black leading-none text-primary/10 translate-x-2 translate-y-2 blur-[2px]"
            >
              404
            </span>
            <span className="relative text-[clamp(120px,25vw,200px)] font-black leading-none bg-gradient-to-br from-primary via-secondary to-primary/70 bg-clip-text text-transparent">
              404
            </span>

            {/* flower badge inside the 0 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-white rounded-full p-3 shadow-md border border-primary/15 animate-spin-slow">
                <Image
                  src="/images/logo.svg"
                  alt="Gulso Logo"
                  width={35}
                  height={35}
                  className="hidden sm:block"
                />
              </div>
            </div>
          </div>

          {/* headline */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-3 leading-tight">
            Sahifa topilmadi
          </h1>

          {/* sub-text */}
          <p className="text-slate-500 text-base font-medium mb-10 leading-relaxed max-w-sm mx-auto">
            Siz qidirayotgan sahifa yo'q yoki boshqa manzilga ko'chirilgan.
            <br />
            Bosh sahifaga qaytib, yangi qidiruv boshlang.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button className="h-12 px-7 font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 flex-shrink-0" />
                Bosh sahifaga qaytish
              </Button>
            </Link>

            <Link href="/catalog">
              <Button
                variant="ghost"
                className="h-12 px-7 font-bold rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-primary/5 hover:border-primary/25 hover:text-primary active:scale-95 transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                Katalogni ko'rish
              </Button>
            </Link>
          </div>

          {/* breadcrumb-style back link */}
          <button
            onClick={() => history.back()}
            className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Oldingi sahifaga qaytish
          </button>
        </div>
      </main>

      {/* ── bottom decoration strip ── */}
      <div
        aria-hidden
        className="relative z-10 h-1.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      {/* ── keyframe styles injected via a <style> tag ── */}
      <style>{`
        @keyframes float-petal {
          0%   { transform: translateY(0)   rotate(0deg)   scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-110vh) rotate(540deg) scale(0.6); opacity: 0; }
        }
        .animate-float-petal {
          animation: float-petal linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
