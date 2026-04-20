import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { CategoryCards } from "@/components/blocks/CategoryCards";
import { ProductGrid } from "@/components/blocks/ProductGrid";
import { Newsletter } from "@/components/blocks/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f7] text-slate-900 font-sans selection:bg-primary/20 transition-all">
      <Header />

      {/* Main Content Area bounded by max-w-7xl/8xl with reduced top margin */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-[72px] transition-all">
        <HeroBanner />
        <CategoryCards />
        <ProductGrid />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
