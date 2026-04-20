"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import { CartStep } from "./CartStep";
import { PaymentStep } from "./PaymentStep";
import { ReceiptStep } from "./ReceiptStep";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const step = searchParams.get("step") || "cart";

    const goToStep = (newStep: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", newStep);
        router.push(`${pathname}?${params.toString()}`);
    };

    if (step === 'receipt') {
        return <ReceiptStep onHome={() => router.push('/')} />;
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />
            <main className="flex-1 w-full max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[80px]">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-bold">
                    <Link href="/" className="text-slate-400 hover:text-primary transition-colors">Asosiy</Link>
                    <Icon icon="material-symbols:chevron-right-rounded" className="w-5 h-5 text-slate-300 shrink-0" />
                    <span className="text-slate-800 tracking-wide bg-slate-200/50 px-2 py-0.5 rounded-md">Savat va rasmiylashtirish</span>
                </nav>

                {step === 'cart' && <CartStep onNext={(method) => goToStep(method === 'card' ? 'payment' : 'receipt')} />}
                {step === 'payment' && <PaymentStep onNext={() => goToStep('receipt')} />}
            </main>
            <Footer />
        </div>
    );
}

export function CheckoutWizard() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8f6f7]"><Icon icon="material-symbols:progress-activity" className="w-10 h-10 text-primary animate-spin" /></div>}>
            <CheckoutContent />
        </Suspense>
    );
}
