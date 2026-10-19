"use client";

import { Button } from "@/components/ui/button";
import { banners } from "@/data/mockData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "@/i18n/routing";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useTranslations } from "next-intl";

export function HeroBanner() {
    const t = useTranslations("HeroBanner");
    return (
        <section className="mb-6 rounded-2xl overflow-hidden shadow-sm relative group">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full"
            >
                {banners.map((banner, i) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative bg-slate-900 aspect-[21/8] sm:aspect-[25/7] min-h-[200px] w-full flex items-center">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-700"
                                style={{ backgroundImage: `url('${banner.image}')` }}
                                role="img"
                                aria-label={t(`slides.${i}.title`)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 md:p-12">
                                <div className="max-w-xl text-white">
                                    <span className="bg-primary hover:bg-primary/90 transition-colors text-white border border-primary/50 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                        {t(`slides.${i}.badge`)}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 leading-tight tracking-tight drop-shadow-sm">
                                        {t(`slides.${i}.title`)}
                                    </h2>
                                    <p className="mt-2 text-slate-200 text-xs sm:text-sm md:text-base opacity-90 max-w-md drop-shadow-sm">
                                        {t(`slides.${i}.description`)}
                                    </p>
                                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
                                        <Link href="/catalog">
                                            <Button className="bg-primary hover:bg-primary/90 text-white px-5 sm:px-6 py-2 rounded-xl font-bold transition-transform active:scale-95 text-xs sm:text-sm h-10 shadow-md border-none">
                                                {t("shopNow")}
                                            </Button>
                                        </Link>
                                        <Link href="/catalog">
                                            <Button variant="outline" className="hidden sm:inline-flex bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-white/30 px-6 py-2 rounded-xl font-bold transition-all active:scale-95 text-sm h-10">
                                                {t("learnMore")}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom styles to override default swiper pagination colors */}
            <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #e7236a !important;
          opacity: 1;
        }
      `}</style>
        </section>
    );
}
