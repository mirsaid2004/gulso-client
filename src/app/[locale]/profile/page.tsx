"use client";

import React, { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { useUser } from "@/features/auth/api/get-user";
import { ProfileSidebar } from "@/features/profile/components/ProfileSidebar";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileStats } from "@/features/profile/components/ProfileStats";
import { OrderHistory } from "@/features/profile/components/OrderHistory";
import { FavoritesList } from "@/features/profile/components/FavoritesList";
import { PersonalInfo } from "@/features/profile/components/PersonalInfo";
import { NotificationsList } from "@/features/notifications/components/NotificationsList";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";

const PROTECTED_TABS = ['profile', 'orders', 'notifications', 'addresses'];

export default function ProfilePage() {
    const t = useTranslations("ProfilePage");
    const { status } = useSession();
    const { data: userResponse, isLoading: isUserLoading } = useUser();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'favorites';
    const personalInfoRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const isAuthenticated = status === 'authenticated';

    // Redirect unauthenticated users away from protected tabs
    useEffect(() => {
        if (status !== 'loading' && !isAuthenticated && PROTECTED_TABS.includes(currentTab)) {
            router.replace('/profile?tab=favorites');
        }
    }, [status, isAuthenticated, currentTab, router]);

    if (status === 'loading' || isUserLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#f8f6f7]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    const user = userResponse?.data ?? null;

    const scrollToEdit = () => {
        if (currentTab !== 'profile') {
            window.location.href = '/profile?tab=profile';
            return;
        }
        personalInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const renderContent = () => {
        if (!isAuthenticated && PROTECTED_TABS.includes(currentTab)) {
            return null;
        }

        switch (currentTab) {
            case 'profile':
                return (
                    <div className="flex flex-col gap-10">
                        <div ref={personalInfoRef}>
                            {user && <PersonalInfo user={user} />}
                        </div>
                        <OrderHistory />
                        <FavoritesList />
                        <NotificationsList />
                    </div>
                );
            case 'orders':
                return <OrderHistory detailed />;
            case 'favorites':
                return <FavoritesList detailed />;
            case 'notifications':
                return <NotificationsList detailed />;
            case 'addresses':
                return (
                    <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 py-20">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                            <Loader2 className="w-8 h-8 animate-pulse" />
                        </div>
                        <p className="text-slate-400 font-bold tracking-tight">{t("addressesComingSoon")}</p>
                    </div>
                );
            default:
                return <FavoritesList detailed />;
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f7]">
            <Header />

            <main className="flex-1 max-w-7xl 2xl:max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-[80px]">
                {user ? (
                    <>
                        <ProfileHeader user={user} onEditClick={scrollToEdit} />
                        <ProfileStats />
                    </>
                ) : (
                    <div className="flex items-center gap-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <Image src="/images/logo.svg" alt="Gulso" width={52} height={52} />
                        <div className="flex-1">
                            <p className="text-lg font-black text-slate-900 tracking-tight">{t("signIn.title")}</p>
                            <p className="text-sm text-slate-500 font-medium mt-0.5">{t("signIn.description")}</p>
                        </div>
                        <Link
                            href="/login"
                            className="shrink-0 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 text-sm"
                        >
                            {t("signIn.button")}
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <ProfileSidebar isAuthenticated={isAuthenticated} />

                    <div className="lg:col-span-9 animate-in fade-in slide-in-from-right-4 duration-500 delay-300 fill-mode-both">
                        {renderContent()}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
