
'use client';
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import BackgroundPetalsAnimation from "@/components/blocks/BackgroundPetalsAnimation";
import MouseGlowAnimation from "@/components/blocks/MouseGlowAnimation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="relative flex flex-col min-h-screen bg-[#f8f6f7] overflow-hidden font-sans">

      {/*NOTE: ambient blobs*/}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none"
      />

      {/*NOTE: main content*/}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="relative inline-block mb-6 select-none">
            <span
              aria-hidden
              className="absolute inset-0 text-[clamp(120px,25vw,200px)] font-black leading-none text-primary/10 translate-x-2 translate-y-2 blur-[2px]"
            >
              404
            </span>
            <span className="relative text-[clamp(120px,25vw,200px)] font-black leading-none bg-gradient-to-br from-primary via-secondary to-primary/70 bg-clip-text text-transparent">
              404
            </span>

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

          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-3 leading-tight">
            {t("title")}
          </h1>

          <p className="text-slate-500 text-base font-medium mb-10 leading-relaxed max-w-sm mx-auto">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button className="h-12 px-7 font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 flex-shrink-0" />
                {t("backHome")}
              </Button>
            </Link>

            <Link href="/catalog">
              <Button
                variant="ghost"
                className="h-12 px-7 font-bold rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-primary/5 hover:border-primary/25 hover:text-primary active:scale-95 transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                {t("viewCatalog")}
              </Button>
            </Link>
          </div>

          <button
            onClick={() => history.back()}
            className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("goBack")}
          </button>
        </div>
      </main>

      {/*NOTE: bottom decoration strip*/}
      <div
        aria-hidden
        className="relative z-10 h-1.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <BackgroundPetalsAnimation />
      <MouseGlowAnimation />
    </div>
  );
}
