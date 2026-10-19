import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { CatalogSection } from "@/components/blocks/CatalogSection";
import { getTranslations } from "next-intl/server";

const SORT_OPTIONS = (t: any) => [
    { label: t("sort.options.popular"), id: "popular" },
    { label: t("sort.options.asc"),     id: "asc" },
    { label: t("sort.options.desc"),    id: "desc" },
    { label: t("sort.options.new"),     id: "new" },
];

export default async function CatalogPage() {
    const t = await getTranslations("Catalog");

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-6 py-8 mt-[80px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <Link href="/" className="text-primary hover:underline font-bold transition-all">
                        {t("breadcrumb.home")}
                    </Link>
                    <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-400 w-5 h-5" />
                    <span className="text-slate-500 font-semibold tracking-wide">{t("breadcrumb.catalog")}</span>
                </div>

                {/* Page Title */}
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t("title")}</h1>
                    <p className="mt-2 text-slate-500 font-medium text-base lg:text-lg">{t("description")}</p>
                </div>

                {/* Sort bar (top) */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 animate-in fade-in duration-500 delay-100 fill-mode-both">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-1 hidden sm:block">
                            {t("sort.label")}
                        </span>
                        {SORT_OPTIONS(t).map((opt, idx) => (
                            <button
                                key={opt.id}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    idx === 0
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters sidebar + grid — client section */}
                <CatalogSection />
            </main>

            <Footer />
        </div>
    );
}
