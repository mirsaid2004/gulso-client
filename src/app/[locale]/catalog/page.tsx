import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/blocks/ProductCard";
import { products } from "@/data/mockData";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { CatalogFilters } from "@/components/blocks/CatalogFilters";

const SORT_OPTIONS = [
    { label: "Ommabopligi", id: "popular" },
    { label: "Arzonroq ↑", id: "asc" },
    { label: "Qimmatroq ↓", id: "desc" },
    { label: "Yangi", id: "new" },
];

export default function CatalogPage() {
    const totalProducts = products.length * 3 + 2; // simulate count

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-6 py-8 mt-[80px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <Link href="/" className="text-primary hover:underline font-bold transition-all">Bosh sahifa</Link>
                    <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-400 w-5 h-5" />
                    <span className="text-slate-500 font-semibold tracking-wide">Mahsulotlar katalogi</span>
                </div>

                {/* Page Title */}
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Mahsulotlar katalogi</h1>
                    <p className="mt-2 text-slate-500 font-medium text-base lg:text-lg">
                        Eng sara gullar, sovg'alar va shirinliklar to'plami siz uchun
                    </p>
                </div>

                {/* Sort Bar & Result Count */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 animate-in fade-in duration-500 delay-100 fill-mode-both">
                    {/* Sort Pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-1 hidden sm:block">Saralash:</span>
                        {SORT_OPTIONS.map((opt, idx) => (
                            <button
                                key={opt.id}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${idx === 0
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Result Count */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Icon icon="material-symbols:search-rounded" className="w-4 h-4 text-slate-400" />
                        <span>
                            <span className="font-black text-slate-800">{totalProducts}</span> ta mahsulot topildi
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Filters Sidebar */}
                    <CatalogFilters />

                    {/* Product Grid */}
                    <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {products.slice(0, 3).map((product) => (
                                <ProductCard key={`dup1-${product.id}`} product={{ ...product, id: product.id * 100 }} />
                            ))}
                            {products.slice(0, 2).map((product) => (
                                <ProductCard key={`dup2-${product.id}`} product={{ ...product, id: product.id * 200 }} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <button className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 shadow-sm">
                                <Icon icon="material-symbols:chevron-left-rounded" className="w-6 h-6" />
                            </button>
                            <button className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-primary/20 transition-all" style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}>1</button>
                            {[2, 3].map((p) => (
                                <button key={p} className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600 font-bold transition-all active:scale-95 shadow-sm">{p}</button>
                            ))}
                            <span className="px-2 text-slate-400 font-bold">•••</span>
                            <button className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600 font-bold transition-all active:scale-95 shadow-sm">12</button>
                            <button className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 shadow-sm">
                                <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
