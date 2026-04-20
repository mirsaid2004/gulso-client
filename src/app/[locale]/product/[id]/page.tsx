import Header from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/blocks/ProductGallery";
import { ProductReviews } from "@/components/blocks/ProductReviews";
import { ProductCard } from "@/components/blocks/ProductCard";
import { products } from "@/data/mockData";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
    const galleryImages = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAsJ6PetLi2dVejRx0nUuafYbfOaT0ZVZqNuBSDfMGAmZho81NLc7040jWmWUQ0lVEB5CnEK3LToa0Ft3BUZWtBOhIHPDtAh10jmy0B9bVZm2bSwdwpTjYskk32kjaGrkuzgFP3hvElHhwMHUx1vPWIN7ZtgAW4HK94sbaJ-fgxhZ39FFpREPszI63QHBQ8TAJO1U_Mr8GMD3EdWYW17BxRqrwo5qaMz8akr3XBBNlpHDY6zZ8jDQvglBvAiAEzuIcFMCLQor0gk0cU",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBo-JJHRSQpZal8bmV4Opt_UN3M3iAGKgVBrPHICuzKyc_TGb1_71Y2uQC6MSZMybVEs2jQciIEwjLydmuRBa3qaqvowFYByhS5mjznkoLYP-I1mTpAkk-_zUyNraNN85VghrVYert1q2_Uct5I-ZbPJ7j8voIqeBiWa8TawL9_3XzLT_TksmV-bV00MzlfvUkpkrsJfuCMkIRGv8duWxu-oZh2iQ3yQaizp3x-7pQ3Db1zPLPd8QPYW19W_j6WHHUvpz6bfSkNtobU",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA76dreEvtVkbX5r4WdiI368YQ20F3Hg-eixeT9chIkwjAnnSk78NewyXLhB_RMoslnOt6OjezRroMhdoGm2mv_ATpAP3nJv8846rIGPWFLRrzFUzpphaxkFYfbZK3jiZwrFiP_N9f-r2CnSOEcbhcV9k5U-gcfsR4OUq5U_QYwOtvi16qc02oipPICQhbJhz7Gzvgj-1d6iUId94bW61mnrs58t8uhV20JMxsUgqMyRhpxxE4Ysd31jb5otRrEI2zQ_KTqiwxTPrJ0",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDDTVMtUufqBIUVfTWufyNbkHuK-N1hS5stFqi4GXUW1CT-ndYbcXn8syfnvUR35fhf4o1nN81U0Oh6qmctyjW9L6vGUctwE_BhEBiP14fGkmsr1b2f_2Z_DfJdDr6arB2wXSGvsWyw9LoshlnmTLfVu_KbZA4B2VNuPiPwX1uXs6OF_qA0szwWIw-gPPhg6CLCFhlN0Y97321Jl9Hnfni_ACgfYogE0d2aq0hig2v2KOSMjUoW6pszxm04MyylqOV8yq9QDU86RMg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATUKQdwJE0heStyU654XbQMecCoQco3EombsjIx8ERe-DYTYBFAFxLW03agZFNP7IDTEJgw1UzE1O_NiaiEdKLowoq1Ju5pgpj61LqCksrGxcVy7-k9NcR_lLDEsz2XeG3K9makZ-RKBCPon3X1gLwDPzJuHxxcc_Ht-TiHwZBIfwQ0AojXx2rQ0ZHnMddB1Mp_AIiLkUAwjfWWQS-M08cYJgbrMB4ud_gTsE47YYNOtJe0i1qHbtQnHYv6vncaILf1sOpizNzyYbW"
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-[80px]">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 mb-8 text-sm font-bold">
                    <Link href="/" className="text-slate-400 hover:text-primary transition-colors">Bosh sahifa</Link>
                    <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-300 w-5 h-5 shrink-0" />
                    <Link href="/catalog" className="text-slate-400 hover:text-primary transition-colors">Gullar</Link>
                    <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-300 w-5 h-5 shrink-0" />
                    <span className="text-slate-800 tracking-wide bg-slate-200/50 px-2 py-0.5 rounded-md">Qizil atirgullar to'plami</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* Gallery Component */}
                    <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
                        <ProductGallery images={galleryImages} />
                    </div>

                    {/* Product Info Component */}
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-150 fill-mode-both">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-emerald-100/50 text-emerald-700 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">Omborda bor</span>
                                <div className="flex items-center gap-0.5 text-amber-500 bg-white border border-slate-100 px-2 py-1.5 rounded-lg shadow-sm">
                                    <Icon icon="material-symbols:star-rounded" className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <Icon icon="material-symbols:star-rounded" className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <Icon icon="material-symbols:star-rounded" className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <Icon icon="material-symbols:star-rounded" className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <Icon icon="material-symbols:star-half-rounded" className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs text-slate-500 font-bold ml-1.5 underline-offset-4 hover:text-primary hover:underline cursor-pointer transition-all">(48 ta sharh)</span>
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Qizil atirgullar to'plami</h1>
                            <div className="flex items-end gap-3 px-1 pt-1">
                                <p className="text-4xl sm:text-5xl font-black text-primary tracking-tighter shadow-primary text-shadow-sm">250,000 <span className="text-xl sm:text-2xl font-bold uppercase tracking-wider">UZS</span></p>
                                <p className="text-lg sm:text-xl font-bold text-slate-400 line-through pb-1 sm:pb-1.5">350,000 UZS</p>
                            </div>
                        </div>

                        {/* Seller Badge */}
                        <Link href="/shop/1" className="group mt-2 flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                <Icon icon="material-symbols:storefront-outline-rounded" className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Sotuvchi do'kon</p>
                                <p className="text-base sm:text-lg font-black text-slate-900 group-hover:text-primary transition-colors">"Gullar dunyosi"</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-black bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 shadow-sm">
                                <Icon icon="material-symbols:verified-outline-rounded" className="w-5 h-5 shrink-0" />
                                Ishonchli
                            </div>
                        </Link>

                        {/* Description */}
                        <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mt-2">
                            <div className="flex items-center gap-3 border-b-2 border-slate-50 pb-4">
                                <Icon icon="material-symbols:description-outline-rounded" className="w-6 h-6 text-primary" />
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Tavsif va xususiyatlar</h3>
                            </div>

                            <p className="text-slate-600 leading-relaxed font-medium text-[15px]">
                                Ushbu hashamatli qizil atirgullar to'plami eng saralangan gullardan tashkil topgan. Har bir atirgul o'zining tarovati va xushbo'y hidi bilan ajralib turadi. Maxsus o'ramda taqdim etiladigan ushbu guldasta har qanday bayram yoki kutilmagan sovg'a uchun mukammal tanlovdir.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 text-[14px] text-slate-700 font-bold bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <li className="flex items-start gap-3"><Icon icon="material-symbols:check-circle-rounded" className="text-primary w-5 h-5 shrink-0 mt-0.5" /> 25 ta premium atirgullar</li>
                                <li className="flex items-start gap-3"><Icon icon="material-symbols:check-circle-rounded" className="text-primary w-5 h-5 shrink-0 mt-0.5" /> Italiyaning sifatli o'rami</li>
                                <li className="flex items-start gap-3"><Icon icon="material-symbols:check-circle-rounded" className="text-primary w-5 h-5 shrink-0 mt-0.5" /> Gullar uchun kukun</li>
                                <li className="flex items-start gap-3"><Icon icon="material-symbols:check-circle-rounded" className="text-primary w-5 h-5 shrink-0 mt-0.5" /> Express 1 soatda berish</li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="space-y-5 pt-2">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl overflow-hidden h-14 shadow-sm w-full sm:w-auto shrink-0 transition-colors focus-within:border-primary/50">
                                    <button className="px-5 h-full hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors active:scale-95 border-r border-slate-100">
                                        <Icon icon="material-symbols:remove-rounded" className="w-5 h-5" />
                                    </button>
                                    <span className="w-12 text-center font-black text-lg text-slate-900">1</span>
                                    <button className="px-5 h-full hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors active:scale-95 border-l border-slate-100">
                                        <Icon icon="material-symbols:add-rounded" className="w-5 h-5" />
                                    </button>
                                </div>

                                <Link href="/checkout?step=cart" className="w-full sm:flex-1 h-14 block">
                                    <Button
                                        className="w-full h-full text-white rounded-2xl font-black text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] border-none"
                                        style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                                    >
                                        <Icon icon="material-symbols:shopping-cart-rounded" className="w-6 h-6 shrink-0" />
                                        Savatga qo'shish / Xarid qilish
                                    </Button>
                                </Link>

                                <button className="hidden sm:flex bg-white border-2 border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 w-14 h-14 items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95 shrink-0">
                                    <Icon icon="material-symbols:favorite-outline-rounded" className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Delivery Estimate Box */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                        <Icon icon="material-symbols:local-shipping-outline-rounded" className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">Yetkazib berish</p>
                                        <p className="text-xs font-medium text-slate-500">Bugun, 24 Mart — Express (1 soat ichida)</p>
                                    </div>
                                    <span className="ml-auto text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0">
                                        Bepul
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                                    <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                        <Icon icon="material-symbols:storefront-outline-rounded" className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">Do'kondan olib ketish</p>
                                        <p className="text-xs font-medium text-slate-500">Bugun mavjud — "Gullar dunyosi" do'konidan</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-100">
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                                        <Icon icon="material-symbols:local-shipping-outline-rounded" className="text-primary w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase leading-tight">Tezkor yetkazish</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 text-center border-x border-slate-100">
                                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                                        <Icon icon="material-symbols:verified-user-outline-rounded" className="text-primary w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase leading-tight">Sifat kafolati</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                                        <Icon icon="material-symbols:payments-outline-rounded" className="text-primary w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase leading-tight">Xavfsiz to'lov</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Customer Reviews Section */}
                <ProductReviews />

                {/* Similar Products Section */}
                <div className="mt-20 sm:mt-32 pt-10 px-0 sm:px-4">
                    <div className="flex items-center justify-between mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Icon icon="material-symbols:grid-view-rounded" className="text-primary/40 hidden sm:block" />
                            O'xshash mahsulotlar
                        </h2>
                        <Link href="/catalog" className="group flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 border border-primary/10 hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm">
                            Barchasi
                            <Icon icon="material-symbols:arrow-forward-rounded" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
