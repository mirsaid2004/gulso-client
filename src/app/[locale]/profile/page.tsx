import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function ProfilePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-[80px]">
                {/* Profile Header */}
                <div className="flex flex-col gap-6 mb-8">
                    <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between sm:items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex gap-6 items-center">
                            <div className="relative w-24 h-24 shrink-0 rounded-[2rem] border-4 border-primary/10 overflow-hidden bg-slate-50">
                                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_z4-FejKSD2SWHZA4x_1-Xb2r7vbosJIU6n_9zDui5qWJkKAqbnJBGFL1M21qjpiQoNfvDSkcwzt-JnugsUKa_2usEzfYVIvBh4clBtlS8hbPlmcrmZXitoRSJVAsfFR0PWjiWi0PPmqIw43M0iE8m4mHoMjd-WaCke5cfyQzozcn2a1vQBahF-7hIV_8tkTis6i3Emw39cupkvwtohx1u31wwiwHwvdP_9eHjxFxqtyB0fW83X5-PVLlKfhPPHP24jRKXoKdvjyD" alt="Avatar" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-slate-900 text-2xl sm:text-3xl font-black tracking-tight">Aziz Rahimjonov</h1>
                                <p className="text-slate-500 font-bold flex items-center gap-2 mt-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg w-fit">
                                    <Icon icon="material-symbols:call-outline-rounded" className="w-5 h-5 text-primary" />
                                    +998 90 123 45 67
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center justify-center gap-2 rounded-2xl h-14 sm:h-12 px-6 sm:px-8 bg-primary/10 text-primary font-black hover:bg-primary/20 hover:text-primary transition-all active:scale-[0.98] w-full sm:w-auto mt-4 sm:mt-0 shadow-sm shadow-primary/5">
                            <Icon icon="material-symbols:edit-outline-rounded" className="w-5 h-5" />
                            <span className="truncate tracking-wide uppercase text-xs">Tahrirlash</span>
                        </button>
                    </div>
                </div>
                {/* Stats Strip */}
                <div className="grid grid-cols-3 gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 delay-100 fill-mode-both">
                    {[
                        { icon: "material-symbols:shopping-bag-outline-rounded", label: "Buyurtmalar", value: "12", color: "text-primary", bg: "bg-primary/5" },
                        { icon: "material-symbols:favorite-outline-rounded", label: "Saralanganlar", value: "38", color: "text-rose-500", bg: "bg-rose-50" },
                        { icon: "material-symbols:payments-outline-rounded", label: "Jami xarid", value: "1.2M", color: "text-emerald-600", bg: "bg-emerald-50" },
                    ].map(({ icon, label, value, color, bg }) => (
                        <div key={label} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
                            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                                <Icon icon={icon} className={`w-5 h-5 ${color}`} />
                            </div>
                            <p className={`text-2xl font-black ${color} tracking-tight`}>{value}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
                        <div className="p-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-1">
                            <Link href="#" className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                                <Icon icon="material-symbols:person-outline-rounded" className="w-6 h-6 shrink-0" />
                                <span className="font-black text-[15px] tracking-wide relative">Profil
                                    <span className="absolute -right-4 -top-1 px-1.5 py-0.5 rounded bg-white text-primary text-[8px] uppercase tracking-tighter">Faol</span>
                                </span>
                            </Link>
                            <Link href="#" className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98]">
                                <Icon icon="material-symbols:favorite-outline-rounded" className="w-6 h-6 shrink-0 group-hover:text-primary transition-colors" />
                                <span className="font-bold text-[15px] tracking-wide">Saralanganlar</span>
                            </Link>
                            <Link href="#" className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98]">
                                <Icon icon="material-symbols:shopping-bag-outline-rounded" className="w-6 h-6 shrink-0 group-hover:text-primary transition-colors" />
                                <span className="font-bold text-[15px] tracking-wide">Buyurtmalar</span>
                            </Link>
                            <Link href="#" className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98]">
                                <Icon icon="material-symbols:location-on-outline-rounded" className="w-6 h-6 shrink-0 group-hover:text-primary transition-colors" />
                                <span className="font-bold text-[15px] tracking-wide">Manzillar</span>
                            </Link>

                            <div className="my-2 border-t border-dashed border-slate-100 mx-2"></div>

                            <button className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all active:scale-[0.98] w-full text-left">
                                <Icon icon="material-symbols:logout-rounded" className="w-6 h-6 shrink-0 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-black text-[15px] tracking-wide uppercase text-xs">Chiqish</span>
                            </button>
                        </div>

                        {/* Become a Seller Banner */}
                        <div className="mt-2 p-6 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col gap-5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                            <div className="absolute -right-10 -top-10 text-primary/10 group-hover:rotate-12 transition-transform duration-500">
                                <Icon icon="material-symbols:storefront-rounded" className="w-40 h-40" />
                            </div>
                            <div className="flex flex-col gap-1.5 relative z-10">
                                <p className="text-slate-900 text-lg font-black tracking-tight">Sotuvchi bo'lish</p>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed pr-8">O'z gullaringiz va ijodingizni bizning platformada minglab mijozlarga soting.</p>
                            </div>
                            <Button className="w-full relative z-10 h-12 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all active:scale-[0.98]">
                                <Icon icon="material-symbols:add-business-rounded" className="w-5 h-5 mr-2" />
                                Sotishni boshlash
                            </Button>
                        </div>
                    </aside>

                    {/* Main Profile Content */}
                    <div className="lg:col-span-9 flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500 delay-300 fill-mode-both">

                        {/* Orders History Preview */}
                        <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <div className="flex items-center justify-between mb-8 border-b-2 border-slate-50 pb-4">
                                <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                                        <Icon icon="material-symbols:history-rounded" className="w-6 h-6" />
                                    </div>
                                    Buyurtmalar tarixi
                                </h2>
                                <Link href="#" className="text-primary text-sm font-black hover:underline tracking-wide">Hammasini ko'rish</Link>
                            </div>
                            <div className="flex flex-col gap-4">

                                {/* Order 1 */}
                                <div className="bg-slate-50/50 hover:bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-sm">
                                    <div className="flex gap-5 items-center">
                                        <div className="w-20 h-20 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-center bg-cover border border-slate-200 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_uUZDgMZS1UscbbRxg1sK0AGdMpQj2UY-HjAXfl8TzRFsRnSUdkiLueieX9x1bHQBvFHXtOleRx6I9RffTKpShvfcxHOKHMRMse-RzfTt7lEYz9MpriOOg93Hahgfp2STOO9obdsfgZd41d-As5vkOFNTL2MSbL1hlxsKk0bJxySeEfkdRBZNJ1GBXHB_Rg45l43h5GutqI_yQZp3bg_C2PlAjuUPbTR5fUSdpFjTRuL49ecc_pZk0gvo9LcQF9lMM1p6H8ChitNY')" }}></div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-black text-[15px] sm:text-base text-slate-900 tracking-tight">Pushti atirgullar guldastasi</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-2 py-0.5 rounded-md">№24891</span>
                                                <span className="text-xs font-bold text-slate-400">12 May, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-wrap items-center justify-between md:justify-end gap-4 sm:gap-6 mt-2 md:mt-0">
                                        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-100/50 border border-blue-100 text-blue-600 flex items-center gap-1.5 shadow-sm">
                                            <Icon icon="material-symbols:local-shipping-rounded" className="w-4 h-4" /> Kuryerda
                                        </span>
                                        <p className="font-black text-primary text-lg whitespace-nowrap">250,000 UZS</p>
                                        <button className="hidden sm:flex w-10 h-10 items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95">
                                            <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Order 2 */}
                                <div className="bg-slate-50/50 hover:bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-sm opacity-80 hover:opacity-100">
                                    <div className="flex gap-5 items-center">
                                        <div className="w-20 h-20 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-center bg-cover border border-slate-200 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGbFw2D-iGVr0uzcPWtJKPXd1j3dRQu2GgoETHpajTmN6OVvwl7CYFeDuhlVEkTVtvq4xZfvsqhIzbQNI4kNwb3JjxOzbP_AB0yZqlIjHdgueE3qbeqbNIVL77iuFcAqcU1j9jRqpyNOQDhNlP5zy8qEgyBSXN8nxmG0xXJFu-pObnEVgpBbzPhPwxptWLIQfWMv_NSjbe9JtMQuQGlZ8sWOxvfDUe60hY8CDeYQAz2rSUBPZQRRjaxqcQRorBT7Iw7AONS0uZ6dwj')" }}></div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-black text-[15px] sm:text-base text-slate-900 tracking-tight">Sariq lola (Premium)</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-2 py-0.5 rounded-md">№24512</span>
                                                <span className="text-xs font-bold text-slate-400">05 May, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-wrap items-center justify-between md:justify-end gap-4 sm:gap-6 mt-2 md:mt-0">
                                        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-100/50 border border-emerald-100 text-emerald-600 flex items-center gap-1.5 shadow-sm">
                                            <Icon icon="material-symbols:check-circle-rounded" className="w-4 h-4" /> Yetkazildi
                                        </span>
                                        <p className="font-black text-slate-600 text-lg whitespace-nowrap line-through decoration-slate-300">180,000 UZS</p>
                                        <button className="hidden sm:flex w-10 h-10 items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95">
                                            <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Favorites Preview */}
                        <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <div className="flex items-center justify-between mb-8 border-b-2 border-slate-50 pb-4">
                                <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
                                    <div className="w-10 h-10 bg-rose-50 rounded-xl text-rose-500 flex items-center justify-center">
                                        <Icon icon="material-symbols:favorite-rounded" className="w-5 h-5" />
                                    </div>
                                    Saralanganlar
                                </h2>
                                <Link href="#" className="text-primary text-sm font-black hover:underline tracking-wide">Barchasini ko'rish</Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

                                {/* Favorite 1 */}
                                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group shadow-sm hover:shadow-md transition-all">
                                    <div className="relative aspect-square">
                                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB62QMuVtbDm49fs3Mbf_tYN0o3DxZ_77wcjZHDHBV_7uNXTr6ztlNx3wxy2Z6stG2lvpDEi6AEJsTleBVHH7NNHnX-GwffqqzmJw45lVSoGScbvac00N0KpPd-zW3FzmO_rpkcuJsosm845i-EdA-8qVEjTtOTxLJr-3EOBXUu4prNorZPnz-VQKilMZpXQDAsxNM2wGo0HcrEi3Gh3h3TclbGHsJVDXk2Yuxu8JjdHGaLN_VPYbwwsAPg25bFX_vY6T-G_OfMSZTh" alt="Fav1" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white/90 text-rose-500 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform">
                                            <Icon icon="material-symbols:favorite-rounded" className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-sm font-black truncate text-slate-900 mb-1">Qizil atirgullar</p>
                                        <p className="text-primary font-black tracking-tight">120,000 UZS</p>
                                    </div>
                                </div>

                                {/* Favorite 2 */}
                                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group shadow-sm hover:shadow-md transition-all">
                                    <div className="relative aspect-square">
                                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Qrq05XeKUc5bctAUw7O1BVZ5WD7Qj7hnVcmvUW3E3YHoKPKBugW1YUoeiwANNT_L4KRCpN-K09WiAPmPzYxGYiKtRqiQxO--ZIGVZA0kbVOMqbWzbaI-tzLmdytnUBnfysxmW7S0471veWiFc_iEwhkzKn7lMC3cq2elI5uEmM0M1Qd75fRK6xgFiSxovOJOv2_p_Q5duc_xegEC7283qHJi-LKW2w6LteNCdvcqJCYPqLtfGYeRoOK1IvhytcSb--w4vkwrVgbi" alt="Fav2" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white/90 text-rose-500 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform">
                                            <Icon icon="material-symbols:favorite-rounded" className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-sm font-black truncate text-slate-900 mb-1">Bahoriy guldasta</p>
                                        <p className="text-primary font-black tracking-tight">95,000 UZS</p>
                                    </div>
                                </div>

                                {/* Favorite 3 */}
                                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group shadow-sm hover:shadow-md transition-all hidden md:block">
                                    <div className="relative aspect-square">
                                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdTwM6cUZ-BYF5oZPHg6ZO_KweNOklLEGlkHtkO1CTN2jSPJHszPpqzZ-MQ0PUl1HvP496dosd-NM_-CiKtlkr4EVpeQhSNch8f_b_-qF7mzGeIJdXPLNlrpIT5ZhwhcCn3jEjOa8ALafWTcwCMCorMpMjEPIK6Q7EpPATsYvGDs0U5XUZ9v_93opd0n6DYCOA9wtuArGcgUOxoNi_qjAR02JLU4uThsppHzq1JdkQcJgUF_h0EzOR1drELJMwMWGKgjTXprJT5f76" alt="Fav3" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white/90 text-rose-500 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform">
                                            <Icon icon="material-symbols:favorite-rounded" className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <p className="text-sm font-black truncate text-slate-900 mb-1">Oq Nilufarlar</p>
                                        <p className="text-primary font-black tracking-tight">145,000 UZS</p>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Personal Info Grid */}
                        <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <div className="flex items-center justify-between mb-8 border-b-2 border-slate-50 pb-4">
                                <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl text-blue-500 flex items-center justify-center">
                                        <Icon icon="material-symbols:badge-outline-rounded" className="w-5 h-5" />
                                    </div>
                                    Shaxsiy ma'lumotlar
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Ism va familiya</label>
                                    <div className="px-5 py-3.5 rounded-2xl bg-slate-50/50 border-2 border-slate-100 text-slate-900 font-bold tracking-wide">
                                        Aziz Rahimjonov
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Telefon raqam</label>
                                    <div className="px-5 py-3.5 rounded-2xl bg-slate-50/50 border-2 border-slate-100 text-slate-900 font-bold tracking-wide">
                                        +998 90 123 45 67
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Elektron pochta</label>
                                    <div className="px-5 py-3.5 rounded-2xl bg-slate-50/50 border-2 border-slate-100 text-slate-900 font-bold tracking-wide truncate">
                                        aziz.rahimjonov@example.com
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Tug'ilgan kun</label>
                                    <div className="px-5 py-3.5 rounded-2xl bg-slate-50/50 border-2 border-slate-100 text-slate-900 font-bold tracking-wide">
                                        15 Iyun, 1995
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main >

            <Footer />
        </div >
    );
}
