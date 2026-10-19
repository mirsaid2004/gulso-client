"use client";

import { categories } from "@/data/mockData";
import { Link } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";

export function CategoryCards() {
    const t = useTranslations("CategoryCards");
    return (
        <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((category, i) => (
                    <Link
                        key={category.id}
                        href="/catalog"
                        className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-20 sm:h-24"
                    >
                        <Image
                            src={category.image}
                            alt={t(`categories.${i}.title`)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-base leading-tight">{t(`categories.${i}.title`)}</span>
                                <span className="text-white/80 text-[10px] hidden sm:block">{t(`categories.${i}.description`)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
