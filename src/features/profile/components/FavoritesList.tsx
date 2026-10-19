"use client";

import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { ProductCard } from "@/components/blocks/ProductCard";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

type FavoritesListProps = {
  detailed?: boolean;
};

export const FavoritesList = ({ detailed = false }: FavoritesListProps) => {
  const t = useTranslations('Profile');
  const [search, setSearch] = useState("");
  const items = useWishlistStore((s) => s.items);

  const favorites = items.map((item) => ({
    id: Number(item.id),
    store: "",
    title: item.title,
    price: item.price,
    image: item.image,
  }));

  const filtered = search.trim()
    ? favorites.filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
    : favorites;

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b-2 border-slate-50 pb-4">
          <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
            <div className="w-10 h-10 bg-rose-50 rounded-xl text-rose-500 flex items-center justify-center">
              <Icon icon="material-symbols:favorite-rounded" className="w-5 h-5" />
            </div>
            {t('favorites.title')}
            {favorites.length > 0 && (
              <span className="text-sm font-bold text-slate-400">({favorites.length})</span>
            )}
          </h2>
          {!detailed && (
            <Link href="/profile?tab=favorites" className="text-primary text-sm font-black hover:underline tracking-wide">
              {t('favorites.viewAll')}
            </Link>
          )}
        </div>

        {detailed && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Icon icon="material-symbols:search-rounded" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={t("favorites.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {detailed ? (
        filtered.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((fav) => (
              <ProductCard key={fav.id} product={fav} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
              <Icon icon="material-symbols:favorite-outline-rounded" className="w-10 h-10" />
            </div>
            <p className="text-slate-400 font-bold">
              {search.trim() ? t("favorites.noMatch") : t("favorites.empty")}
            </p>
          </div>
        )
      ) : favorites.length > 0 ? (
        <div className="relative group/slider">
          <Swiper
            modules={[FreeMode, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.3}
            wrapperClass='py-4'
            freeMode={true}
            navigation={{ prevEl: '.fav-prev', nextEl: '.fav-next' }}
            breakpoints={{
              480: { slidesPerView: 1.8 },
              640: { slidesPerView: 2.3 },
              768: { slidesPerView: 2.8 },
              1024: { slidesPerView: 3.3 },
              1280: { slidesPerView: 3.8 },
            }}
            className="pb-10 !px-1"
          >
            {favorites.map((fav) => (
              <SwiperSlide key={fav.id}>
                <ProductCard product={fav} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="fav-prev absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 disabled:hidden">
            <Icon icon="material-symbols:chevron-left-rounded" className="w-6 h-6" />
          </button>
          <button className="fav-next absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 disabled:hidden">
            <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
          </button>

          <div className="absolute right-0 top-0 bottom-10 w-24 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />
        </div>
      ) : (
        <div className="py-12 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
            <Icon icon="material-symbols:favorite-outline-rounded" className="w-8 h-8" />
          </div>
          <p className="text-slate-400 font-bold text-sm">{t("favorites.empty")}</p>
        </div>
      )}
    </section>
  );
};
