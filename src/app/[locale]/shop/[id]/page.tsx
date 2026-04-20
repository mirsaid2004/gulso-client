import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/blocks/ProductCard";
import { products } from "@/data/mockData";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function ShopProfilePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 w-full pb-20 mt-[80px]">
                {/* Shop Header Banner Section */}
                <div className="relative bg-white border-b border-primary/5 shadow-sm">
                    {/* Cover Image */}
                    <div className="h-48 w-full sm:h-64 lg:h-[350px] relative">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIrWjfsgDRVQC9WVyDasJDd9CICBPTfji6bx7_XN36VuAjd2MwDq9zaW_fXoTLRiMC0y2PDUxEJwnAF5hfR-C-bHlbxUjozVszz1eIH2bLHw7n57oJ9ELR04YM55Z4hV7WRwDNDQWKLs8n5DPp5n6azceCuvO1Q7J9n23yQBlyfpOrTcNBHclZ3XSIz7Uj7oWcTi3NBQBBKkLI4cKBb8NI1bK9wPz3dpZVXPcUTDLpo4K3aZol_eutZrHsEqqbVN_iP5kCjdMi0NyS"
                            alt="Shop Cover"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    <div className="mx-auto max-w-7xl 2xl:max-w-8xl px-6 lg:px-8">
                        <div className="relative -mt-16 sm:-mt-24 flex flex-col items-center gap-6 md:flex-row md:items-end pb-8">
                            {/* Profile Avatar */}
                            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl isolate z-10 relative">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQDlQelo6bJOvyVb1d6x7x0Mf4auHYE561AHJgoQQPCkKc23yf-HUcSxiqECTc4wtkoyMdy8sE6REEuz23MoyvYhIEG8GDmm7KeW_qTGTZA7UKlxsbwtQYqMLFyZfmkvgZEVTiLguN2OYNrDOd3UYFh_TP1Yr4qz2Y3_crSnTnmaR4PVF2EhBQSKs8g76Cqb2PNPnr1ZJLarko2fJcDOfiEtcVC3LwoYJ5qFwWFsmAPcbbH4Fk7Gq_gmDV_CiRgm7tb83hdFPJw4mL"
                                    alt="Shop Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="flex flex-1 flex-col items-center text-center md:items-start md:pb-2 md:text-left z-10">
                                <h1 className="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight leading-none mb-3">Gullar dunyosi</h1>

                                <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-500 md:justify-start">
                                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg text-amber-600 shadow-sm">
                                        <Icon icon="material-symbols:star-rounded" className="text-amber-500 text-lg" />
                                        <span className="font-black">4.9</span>
                                        <span className="text-xs font-bold opacity-80">(120 sharh)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-lg text-primary shadow-sm">
                                        <Icon icon="material-symbols:group-rounded" className="text-lg" />
                                        <span className="font-black">2.5k</span>
                                        <span className="text-xs font-bold opacity-80 uppercase tracking-wider">Obunachilar</span>
                                    </div>
                                </div>

                                <p className="mt-4 max-w-xl text-slate-600 font-medium leading-relaxed">Siz uchun eng go'zal gullar va sovg'alar to'plami. Har bir guldastani sevgi bilan tayyorlaymiz.</p>
                            </div>

                            {/* Subscribe Button */}
                            <div className="flex shrink-0 gap-3 pb-2 w-full sm:w-auto mt-2 sm:mt-0 z-10">
                                <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary w-full px-8 py-3.5 sm:py-4 font-black text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-[15px] hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20">
                                    <Icon icon="material-symbols:person-add-rounded" className="text-xl shrink-0" />
                                    Obuna bo'lish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="mx-auto max-w-7xl 2xl:max-w-8xl px-6 lg:px-8 mt-12">
                    <div className="flex flex-col gap-10 lg:flex-row items-start">

                        {/* Shop Info Sidebar */}
                        <aside className="w-full lg:w-80 shrink-0 space-y-6">
                            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Ma'lumotlar</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Icon icon="material-symbols:local-shipping-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[13px] font-black uppercase text-slate-400 tracking-wider mb-1">Yetkazib berish</p>
                                            <p className="text-[15px] font-bold text-slate-900">Toshkent bo'ylab 60 daqiqada</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Icon icon="material-symbols:location-on-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[13px] font-black uppercase text-slate-400 tracking-wider mb-1">Manzil</p>
                                            <p className="text-[15px] font-bold text-slate-900">Toshkent sh., Yunusobod tumani</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Icon icon="material-symbols:schedule-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[13px] font-black uppercase text-slate-400 tracking-wider mb-1">Ish vaqti</p>
                                            <p className="text-[15px] font-bold text-slate-900">09:00 - 21:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Icon icon="material-symbols:call-outline-rounded" className="w-5 h-5" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="text-[13px] font-black uppercase text-slate-400 tracking-wider mb-1">Telefon</p>
                                            <p className="text-[15px] font-bold text-slate-900">+998 90 123 45 67</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 p-6 sm:p-8 border border-primary/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute -right-10 -top-10 text-primary/10 group-hover:rotate-12 transition-transform duration-500">
                                    <Icon icon="material-symbols:local-florist-rounded" className="w-40 h-40" />
                                </div>
                                <h4 className="font-black text-primary text-xl tracking-tight mb-3 relative z-10">Bugungi taklif! <span className="text-xl">🔥</span></h4>
                                <p className="mt-2 text-sm text-primary/80 font-bold leading-relaxed relative z-10">Birinchi buyurtmangiz uchun <span className="text-primary text-lg font-black bg-white px-1.5 py-0.5 rounded-md shadow-sm mx-1">10% chegirma</span> oling!</p>
                                <div className="mt-5 relative z-10 flex items-center justify-between bg-white border border-primary/20 rounded-xl px-4 py-3 border-dashed">
                                    <span className="font-black text-slate-900 tracking-widest text-lg">GULSO10</span>
                                    <button className="text-primary hover:text-white hover:bg-primary bg-primary/10 p-2 rounded-lg transition-colors active:scale-95">
                                        <Icon icon="material-symbols:content-copy-outline-rounded" className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Product Content Area */}
                        <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Tabs */}
                            <div className="mb-10 flex items-center gap-2 overflow-x-auto border-b-2 border-slate-100 scrollbar-hide">
                                <button className="whitespace-nowrap border-b-[3px] border-primary pb-3 px-2 sm:px-4 text-[15px] font-black text-primary transition-colors">Barchasi</button>
                                <button className="whitespace-nowrap border-b-[3px] border-transparent pb-3 px-2 sm:px-4 text-[15px] font-bold text-slate-400 hover:text-slate-800 transition-colors">Gullar</button>
                                <button className="whitespace-nowrap border-b-[3px] border-transparent pb-3 px-2 sm:px-4 text-[15px] font-bold text-slate-400 hover:text-slate-800 transition-colors">Guldastalar</button>
                                <button className="whitespace-nowrap border-b-[3px] border-transparent pb-3 px-2 sm:px-4 text-[15px] font-bold text-slate-400 hover:text-slate-800 transition-colors">Sovg'alar</button>
                                <button className="whitespace-nowrap border-b-[3px] border-transparent pb-3 px-2 sm:px-4 text-[15px] font-bold text-slate-400 hover:text-slate-800 transition-colors">Xonaki gullar</button>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                                {products.map((p) => (
                                    <ProductCard key={`dup-${p.id}`} product={{ ...p, id: p.id * 80 }} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-16 flex items-center justify-center gap-2">
                                <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95">
                                    <Icon icon="material-symbols:chevron-left-rounded" className="w-6 h-6" />
                                </button>
                                <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-white font-extrabold shadow-lg shadow-primary/20 transition-all">1</button>
                                <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600 font-bold transition-all active:scale-95">2</button>
                                <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600 font-bold transition-all active:scale-95">3</button>
                                <button className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600 transition-all active:scale-95">
                                    <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
