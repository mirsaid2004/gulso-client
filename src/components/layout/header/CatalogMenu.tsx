"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Menu, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { categories, products } from "@/data/mockData";

export default function CatalogMenu() {
    return (
        <HoverCard>
            <HoverCardTrigger
                className={cn(
                    buttonVariants({ variant: "default" }),
                    "hidden lg:flex items-center gap-2 font-bold px-5 text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 rounded-xl cursor-pointer"
                )}
            >
                <Menu className="w-4 h-4" />
                Katalog
            </HoverCardTrigger>

            <HoverCardContent
                align="start"
                sideOffset={12}
                className="w-[800px] p-0 rounded-2xl border-primary/10 shadow-xl flex"
            >
                {/* Left sidebar: Categories */}
                <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100 flex flex-col gap-2">
                    <h3 className="font-bold text-slate-900 mb-2 px-3">Kategoriyalar</h3>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.id}`}
                            className="flex flex-col px-3 py-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group/item"
                        >
                            <span className="font-bold text-sm text-slate-700 group-hover/item:text-primary transition-colors">
                                {cat.title}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Right side: Highlighted Products */}
                <div className="w-2/3 p-6 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">Ommabop mahsulotlar</h3>
                        <Link
                            href="/catalog"
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                        >
                            Barchasini ko'rish <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {products.slice(0, 2).map((prod) => (
                            <Link
                                key={prod.id}
                                href={`/product/${prod.id}`}
                                className="group/prod flex flex-col border border-primary/5 rounded-xl p-2 hover:shadow-md hover:border-primary/20 transition-all bg-slate-50/50 hover:bg-white"
                            >
                                <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                                    <Image
                                        src={prod.image}
                                        alt={prod.title}
                                        fill
                                        className="object-cover transition-transform group-hover/prod:scale-105"
                                    />
                                </div>
                                <h4 className="font-bold text-xs line-clamp-1 mb-1">
                                    {prod.title}
                                </h4>
                                <p className="text-primary font-bold text-xs">
                                    {prod.price.toLocaleString()} so'm
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
