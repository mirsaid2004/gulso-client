"use client";

import { use, useState } from "react";
import Header from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/blocks/ProductCard";
import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { Link } from "@/i18n/routing";
import { useCompany } from "@/features/company/api/get-company";
import { useProducts } from "@/features/products/api/get-products";
import { toCardProps } from "@/lib/product-mapper";
import { ProductCategory } from "@/types/enums";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 9;

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export default function ShopProfilePage({ params }: ShopPageProps) {
  const { id } = use(params);
  const t = useTranslations("Shop");
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);

  const TABS: { label: string; category?: ProductCategory }[] = [
    { label: t("tabs.all") },
    { label: t("tabs.flowers"), category: ProductCategory.FLOWERS },
    { label: t("tabs.gifts"), category: ProductCategory.GIFTS },
    { label: t("tabs.bakery"), category: ProductCategory.BAKERY },
  ];

  const { data: companyData, isLoading: companyLoading } = useCompany(id);
  const company = companyData?.data;

  const { data: productsData, isLoading: productsLoading } = useProducts({
    params: {
      companyId: Number(id),
      category: TABS[activeTab].category,
      page,
      size: PAGE_SIZE,
    },
  });

  const products = productsData?.data ?? [];
  const meta = productsData?.meta;
  const totalPages = meta?.lastPage ?? 1;

  const address = company?.addresses?.[0];

  function handleCopy() {
    navigator.clipboard.writeText("GULSO10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleTabChange(i: number) {
    setActiveTab(i);
    setPage(0);
  }

  if (companyLoading) {
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

  if (!company) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center mt-[80px] gap-4">
          <Icon icon="material-symbols:storefront-outline-rounded" className="w-16 h-16 text-slate-300" />
          <p className="font-black text-slate-500 text-xl">{t("notFound")}</p>
          <Link href="/catalog" className="text-primary font-bold hover:underline">{t("backToCatalog")}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
      <Header />

      <main className="flex-1 w-full pb-20 mt-[80px]">
        {/* Shop Header Banner */}
        <div className="relative bg-white border-b border-primary/5 shadow-sm">
          <div className="h-48 w-full sm:h-64 lg:h-[320px] relative overflow-hidden bg-gradient-to-br from-primary/20 via-rose-100 to-pink-50">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Icon icon="material-symbols:local-florist-rounded" className="w-96 h-96 text-primary" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          <div className="mx-auto max-w-7xl 2xl:max-w-8xl px-6 lg:px-8">
            <div className="relative -mt-16 sm:-mt-24 flex flex-col items-center gap-6 md:flex-row md:items-end pb-8">
              {/* Logo avatar */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl isolate z-10 relative">
                {company.logoUrl ? (
                  <Image src={company.logoUrl} alt={company.shopName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Icon icon="material-symbols:storefront-rounded" className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col items-center text-center md:items-start md:pb-2 md:text-left z-10">
                <h1 className="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight leading-none mb-3">
                  {company.shopName}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {company.productType && (
                    <span className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-lg text-primary text-sm font-black shadow-sm">
                      <Icon icon="material-symbols:category-outline-rounded" className="text-base" />
                      {company.productType}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg text-emerald-600 text-sm font-black shadow-sm">
                    <Icon icon="material-symbols:verified-outline-rounded" className="text-base" />
                    {t("sidebar.verified")}
                  </span>
                </div>

                {company.description && (
                  <p className="mt-4 max-w-xl text-slate-600 font-medium leading-relaxed text-sm">
                    {company.description}
                  </p>
                )}
              </div>

              {/* Subscribe button */}
              <div className="flex shrink-0 gap-3 pb-2 w-full sm:w-auto mt-2 sm:mt-0 z-10">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary w-full px-8 py-3.5 sm:py-4 font-black text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-[15px] hover:bg-primary/90">
                  <Icon icon="material-symbols:person-add-rounded" className="text-xl shrink-0" />
                  {t("sidebar.subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl 2xl:max-w-8xl px-6 lg:px-8 mt-12">
          <div className="flex flex-col gap-10 lg:flex-row items-start">

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">{t("sidebar.info")}</h3>
                <div className="space-y-5">
                  {company.workingHours && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Icon icon="material-symbols:schedule-outline-rounded" className="w-5 h-5" />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[12px] font-black uppercase text-slate-400 tracking-wider mb-1">{t("sidebar.workingHours")}</p>
                        <p className="text-[15px] font-bold text-slate-900">{company.workingHours}</p>
                      </div>
                    </div>
                  )}

                  {address && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Icon icon="material-symbols:location-on-outline-rounded" className="w-5 h-5" />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[12px] font-black uppercase text-slate-400 tracking-wider mb-1">{t("sidebar.address")}</p>
                        <p className="text-[15px] font-bold text-slate-900">
                          {[address.district, address.region, address.country].filter(Boolean).join(", ")}
                        </p>
                        {address.street && (
                          <p className="text-[13px] text-slate-500 font-medium mt-0.5">{address.street}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon icon="material-symbols:local-shipping-outline-rounded" className="w-5 h-5" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[12px] font-black uppercase text-slate-400 tracking-wider mb-1">{t("sidebar.delivery")}</p>
                      <p className="text-[15px] font-bold text-slate-900">{t("sidebar.deliveryText")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon icon="material-symbols:calendar-today-outline-rounded" className="w-5 h-5" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[12px] font-black uppercase text-slate-400 tracking-wider mb-1">{t("sidebar.registered")}</p>
                      <p className="text-[15px] font-bold text-slate-900">
                        {new Date(company.createdAt).toLocaleDateString("uz-UZ", { year: "numeric", month: "long" })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo block */}
              <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 p-6 sm:p-8 border border-primary/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute -right-10 -top-10 text-primary/10 group-hover:rotate-12 transition-transform duration-500">
                  <Icon icon="material-symbols:local-florist-rounded" className="w-40 h-40" />
                </div>
                <h4 className="font-black text-primary text-xl tracking-tight mb-3 relative z-10">
                  {t("promo.title")}
                </h4>
                <p className="mt-2 text-sm text-primary/80 font-bold leading-relaxed relative z-10">
                  {t("promo.description", { discount: 10 })}
                </p>
                <div className="mt-5 relative z-10 flex items-center justify-between bg-white border border-primary/20 rounded-xl px-4 py-3 border-dashed">
                  <span className="font-black text-slate-900 tracking-widest text-lg">GULSO10</span>
                  <button
                    onClick={handleCopy}
                    className="text-primary hover:text-white hover:bg-primary bg-primary/10 p-2 rounded-lg transition-colors active:scale-95"
                  >
                    <Icon
                      icon={copied ? "material-symbols:check-rounded" : "material-symbols:content-copy-outline-rounded"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </aside>

            {/* Product area */}
            <div className="flex-1 w-full min-w-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Category tabs */}
              <div className="mb-10 flex items-center gap-2 overflow-x-auto border-b-2 border-slate-100 scrollbar-hide">
                {TABS.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => handleTabChange(i)}
                    className={`whitespace-nowrap border-b-[3px] pb-3 px-2 sm:px-4 text-[15px] font-bold transition-colors ${
                      activeTab === i
                        ? "border-primary text-primary font-black"
                        : "border-transparent text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Products grid */}
              {productsLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Icon icon="line-md:loading-twotone-loop" className="w-10 h-10 text-primary" />
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <Icon icon="material-symbols:inventory-2-outline-rounded" className="w-16 h-16 text-slate-300" />
                  <p className="font-black text-slate-500 text-lg">{t("products.empty")}</p>
                  <p className="text-slate-400 font-medium text-sm">{t("products.emptySubtitle")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={toCardProps(p)} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 disabled:opacity-40"
                  >
                    <Icon icon="material-symbols:chevron-left-rounded" className="w-6 h-6" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all active:scale-95 ${
                        page === i
                          ? "bg-primary text-white shadow-lg shadow-primary/20 font-extrabold"
                          : "border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white hover:bg-primary/5 hover:border-primary/20 text-slate-400 transition-all active:scale-95 disabled:opacity-40"
                  >
                    <Icon icon="material-symbols:chevron-right-rounded" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
