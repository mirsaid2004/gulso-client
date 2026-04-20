"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image Gallery */}
            <div className="aspect-square w-full rounded-3xl overflow-hidden bg-slate-50 sm:border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group relative">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="w-full h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={img}
                                    alt={`Product Cover ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all active:scale-95 z-10 pointer-events-auto">
                    <Icon icon="material-symbols:zoom-in-rounded" className="w-6 h-6 shrink-0" />
                </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
                <div className="w-full">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={12}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="w-full py-1"
                        breakpoints={{
                            320: { slidesPerView: 4, spaceBetween: 10 },
                            640: { slidesPerView: 5, spaceBetween: 12 },
                        }}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index} className="cursor-pointer">
                                {({ isActive }) => (
                                    <div className={`aspect-square rounded-2xl overflow-hidden relative transition-all duration-300 ${isActive ? "border-2 border-primary shadow-md ring-2 ring-primary/20 ring-offset-1" : "border border-slate-200 bg-slate-50 opacity-60 hover:opacity-100"}`}>
                                        <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="25vw" />
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    color: #e7236a !important;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(4px);
                    width: 40px !important;
                    height: 40px !important;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 16px !important;
                    font-weight: bold;
                }
                .swiper-pagination-bullet-active {
                    background: #e7236a !important;
                }
            `}</style>
        </div>
    );
}
