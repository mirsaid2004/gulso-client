import { products } from "@/data/mockData";
import { ProductCard } from "./ProductCard";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductGrid() {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Tavsiya etilgan mahsulotlar</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Load More */}
            <div className="mt-10 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors border-primary/20 h-auto py-2.5 px-6 rounded-lg bg-transparent">
                    Yana ko'proq ko'rish
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </Button>
            </div>
        </section>
    );
}
