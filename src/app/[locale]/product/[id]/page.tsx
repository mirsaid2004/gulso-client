"use client";

import { use } from "react";
import Header from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/blocks/ProductGallery";
import { ProductReviews } from "@/components/blocks/ProductReviews";
import { ProductCard } from "@/components/blocks/ProductCard";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useProduct } from "@/features/products/api/get-product";
import { useProducts } from "@/features/products/api/get-products";
import { useCartStore } from "@/features/cart/useCartStore";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";
import { toCardProps } from "@/lib/product-mapper";
import { ProductStatus } from "@/types/enums";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const tCatalog = useTranslations("Catalog");
  const tProduct = useTranslations("Product");

  const { data: productData, isLoading, isError } = useProduct({ id });
  const { data: similarData } = useProducts({ params: { size: 4 } });

  const product = productData?.data;
  const similar = (similarData?.data ?? [])
    .filter((p) => p.id !== Number(id))
    .slice(0, 4);

  const { addItem, removeItem, incrementItem, decrementItem, items } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  const images = product?.media?.map((m) => m.url) ?? [];
  const actualPrice = product
    ? Math.round(product.price * (1 - product.discount))
    : 0;
  const isWishlisted = product ? hasItem(String(product.id)) : false;
  const inStock = product?.status === ProductStatus.ACTIVE && product.available;

  const cartItem = product ? items.find((i) => i.id === String(product.id)) : null;
  const cartQty = cartItem?.quantity ?? 0;

  function handleAddToCart() {
    if (!product) return;
    addItem({
      id: String(product.id),
      productId: product.id,
      title: product.name,
      store: product.company.name,
      image: images[0] ?? "",
      price: actualPrice,
      originalPrice: product.discount > 0 ? product.price : undefined,
    });
  }

  function handleToggleWishlist() {
    if (!product) return;
    toggleItem({
      id: String(product.id),
      title: product.name,
      image: images[0] ?? "",
      price: actualPrice,
    });
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
        <Header />
        <main className="flex-1 flex items-center justify-center mt-[80px]">
          <Icon icon="line-md:loading-twotone-loop" className="w-12 h-12 text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center mt-[80px] gap-4">
          <Icon icon="material-symbols:error-outline-rounded" className="w-16 h-16 text-slate-300" />
          <p className="font-black text-slate-500 text-xl">{tProduct("notFound")}</p>
          <Link href="/catalog" className="text-primary font-bold hover:underline">
            {tProduct("backToCatalog")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
      <Header />

      <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-[80px]">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 mb-8 text-sm font-bold">
          <Link href="/" className="text-slate-400 hover:text-primary transition-colors">
            {tCatalog("breadcrumb.home")}
          </Link>
          <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-300 w-5 h-5 shrink-0" />
          <Link href="/catalog" className="text-slate-400 hover:text-primary transition-colors">
            {tCatalog("breadcrumb.flowers")}
          </Link>
          <Icon icon="material-symbols:chevron-right-rounded" className="text-slate-300 w-5 h-5 shrink-0" />
          <span className="text-slate-800 tracking-wide bg-slate-200/50 px-2 py-0.5 rounded-md">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
            <ProductGallery images={images.length > 0 ? images : ["/images/placeholder.png"]} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-150 fill-mode-both">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${inStock ? "bg-emerald-100/50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                  {inStock ? tProduct("status.inStock") : tProduct("status.outOfStock")}
                </span>
                {product.reviewCount > 0 && (
                  <div className="flex items-center gap-0.5 text-amber-500 bg-white border border-slate-100 px-2 py-1.5 rounded-lg shadow-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        icon={
                          product.rating >= star
                            ? "material-symbols:star-rounded"
                            : product.rating >= star - 0.5
                            ? "material-symbols:star-half-rounded"
                            : "material-symbols:star-outline-rounded"
                        }
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    ))}
                    <span className="text-xs text-slate-500 font-bold ml-1.5 underline-offset-4 hover:text-primary hover:underline cursor-pointer transition-all">
                      {tProduct("reviews", { count: product.reviewCount })}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 px-1 pt-1">
                <p className="text-4xl sm:text-5xl font-black text-primary tracking-tighter shadow-primary text-shadow-sm">
                  {actualPrice.toLocaleString("uz-UZ")}{" "}
                  <span className="text-xl sm:text-2xl font-bold uppercase tracking-wider">{tProduct("currency")}</span>
                </p>
                {product.discount > 0 && (
                  <p className="text-lg sm:text-xl font-bold text-slate-400 line-through pb-1 sm:pb-1.5">
                    {product.price.toLocaleString("uz-UZ")} {tProduct("currency")}
                  </p>
                )}
              </div>
            </div>

            {/* Seller Badge */}
            <Link
              href={`/shop/${product.company.id}`}
              className="group mt-2 flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                <Icon icon="material-symbols:storefront-outline-rounded" className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                  {tProduct("seller")}
                </p>
                <p className="text-base sm:text-lg font-black text-slate-900 group-hover:text-primary transition-colors">
                  "{product.company.name}"
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-black bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 shadow-sm">
                <Icon icon="material-symbols:verified-outline-rounded" className="w-5 h-5 shrink-0" />
                {tProduct("status.reliable")}
              </div>
            </Link>

            {/* Description */}
            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mt-2">
              <div className="flex items-center gap-3 border-b-2 border-slate-50 pb-4">
                <Icon icon="material-symbols:description-outline-rounded" className="w-6 h-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {tProduct("descriptionLabel")}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium text-[15px]">
                {product.description}
              </p>
              {product.specifications.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 text-[14px] text-slate-700 font-bold bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon icon="material-symbols:check-circle-rounded" className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-3 h-14">
                {/* Add to cart button OR remove icon when in cart */}
                <button
                  onClick={() => {
                    if (cartQty === 0) {
                      handleAddToCart();
                    } else {
                      removeItem(String(product.id));
                    }
                  }}
                  disabled={!inStock}
                  style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                  className={`h-14 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-primary/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shrink-0 overflow-hidden ${
                    cartQty > 0 ? "w-14" : "flex-1 gap-2"
                  }`}
                >
                  <Icon
                    icon={cartQty > 0 ? "material-symbols:close-rounded" : "material-symbols:shopping-cart-rounded"}
                    className="w-6 h-6 shrink-0"
                  />
                  <span className={`whitespace-nowrap transition-all duration-300 ${cartQty > 0 ? "w-0 opacity-0" : "opacity-100"}`}>
                    {tProduct("addToCart")}
                  </span>
                </button>

                {/* Incrementor — appears when in cart */}
                {cartQty > 0 && (
                  <div className="flex-1 flex items-center gap-2 animate-in fade-in slide-in-from-right-3 duration-200">
                    <button
                      onClick={() => decrementItem(String(product.id))}
                      style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                      className="h-14 flex-1 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                      <Icon icon="material-symbols:remove-rounded" className="w-6 h-6" />
                    </button>
                    <span className="text-2xl font-black text-primary text-center tabular-nums min-w-[2rem] text-center">
                      {cartQty}
                    </span>
                    <button
                      onClick={() => incrementItem(String(product.id))}
                      style={{ background: "linear-gradient(135deg, #e7236a 0%, #c41d5e 100%)" }}
                      className="h-14 flex-1 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                      <Icon icon="material-symbols:add-rounded" className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`hidden sm:flex border-2 w-14 h-14 items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95 shrink-0 ${isWishlisted ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50"}`}
                >
                  <Icon icon={isWishlisted ? "material-symbols:favorite-rounded" : "material-symbols:favorite-outline-rounded"} className="w-6 h-6" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon icon="material-symbols:local-shipping-outline-rounded" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{tProduct("delivery.title")}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {tProduct("delivery.today")} — {tProduct("delivery.express")}
                    </p>
                  </div>
                  <span className="ml-auto text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0">
                    {tProduct("delivery.free")}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <div className="w-9 h-9 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon icon="material-symbols:storefront-outline-rounded" className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{tProduct("pickup.title")}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {tProduct("pickup.available")} — {tProduct("pickup.store", { store: `"${product.company.name}"` })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-100">
                {[
                  { icon: "material-symbols:local-shipping-outline-rounded", label: tProduct("trust.fast") },
                  { icon: "material-symbols:verified-user-outline-rounded", label: tProduct("trust.quality") },
                  { icon: "material-symbols:payments-outline-rounded", label: tProduct("trust.payment") },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col items-center gap-1.5 text-center ${i === 1 ? "border-x border-slate-100" : ""}`}>
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                      <Icon icon={item.icon} className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wide uppercase leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews productId={id} reviewCount={product.reviewCount} />

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="mt-20 sm:mt-32 pt-10 px-0 sm:px-4">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <Icon icon="material-symbols:grid-view-rounded" className="text-primary/40 hidden sm:block" />
                {tProduct("similarProducts")}
              </h2>
              <Link
                href="/catalog"
                className="group flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 border border-primary/10 hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm"
              >
                {tProduct("viewAll")}
                <Icon icon="material-symbols:arrow-forward-rounded" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((p) => (
                <ProductCard key={p.id} product={toCardProps(p)} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
