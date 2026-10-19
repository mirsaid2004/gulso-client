import { ProductResponse } from "@/types";

// Maps ProductResponse (API shape) → ProductCard props shape
export function toCardProps(p: ProductResponse) {
  const actualPrice = Math.round(p.price * (1 - p.discount));
  return {
    id: p.id,
    store: p.company.name,
    companyId: p.company.id,
    title: p.name,
    price: actualPrice,
    originalPrice: p.discount > 0 ? p.price : undefined,
    image: p.imageUrl,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isNew: p.isNew,
    isTopSeller: p.isBestSeller,
  };
}
