'use client';

import { Suspense } from "react";
import { LoginForm } from "@/features/auth";
import BackgroundPetalsAnimation from "@/components/blocks/BackgroundPetalsAnimation";
import MouseGlowAnimation from "@/components/blocks/MouseGlowAnimation";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '';
    const t = useTranslations('Auth');

    const handlePhoneSubmit = (phone: string) => {
        const params = new URLSearchParams({ phone: phone.replace(/\s/g, '') });
        if (redirect) params.set('redirect', redirect);
        router.push(`/verify?${params.toString()}`);
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 overflow-x-hidden">
            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative w-full overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="w-full max-w-md relative z-10 mx-auto">
                    <LoginForm onSubmit={handlePhoneSubmit} />
                </div>
            </main>

            <footer className="flex-none pb-6 px-6 text-center text-slate-400 text-xs font-semibold tracking-wide z-10">
                © {new Date().getFullYear()} Gulso 1.0. {t('footer.rights')}
            </footer>

            <div
                aria-hidden
                className="relative z-10 h-1.5 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />
            <BackgroundPetalsAnimation />
            <MouseGlowAnimation />
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    );
}
