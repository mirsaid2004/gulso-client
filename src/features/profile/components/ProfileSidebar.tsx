"use client";

import React from 'react';
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

interface ProfileSidebarProps {
  isAuthenticated: boolean;
}

export const ProfileSidebar = ({ isAuthenticated }: ProfileSidebarProps) => {
  const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'favorites';
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await signOut({ callbackUrl: '/' });
  };

  const UNREAD_COUNT = 2;

  const navItems = [
    { id: 'profile',       label: t('sidebar.profile'),       icon: "material-symbols:person-outline-rounded",        badge: 0,           requiresAuth: true  },
    { id: 'favorites',     label: t('sidebar.favorites'),     icon: "material-symbols:favorite-outline-rounded",      badge: 0,           requiresAuth: false },
    { id: 'orders',        label: t('sidebar.orders'),        icon: "material-symbols:orders-outline",                badge: 0,           requiresAuth: true  },
    { id: 'notifications', label: t('sidebar.notifications'),  icon: "material-symbols:notifications-outline-rounded", badge: UNREAD_COUNT, requiresAuth: true  },
    { id: 'addresses',     label: t('sidebar.addresses'),     icon: "material-symbols:location-on-outline-rounded",   badge: 0,           requiresAuth: true  },
  ];

  return (
    <aside className="lg:col-span-3 flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
      <div className="p-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-1">
        {navItems.map((item) => {
          const isLocked = item.requiresAuth && !isAuthenticated;
          const isActive = currentTab === item.id && !isLocked;

          if (isLocked) {
            return (
              <Link
                key={item.id}
                href="/login"
                className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all text-slate-300 hover:bg-slate-50 hover:text-slate-400"
              >
                <Icon icon={item.icon} className="w-6 h-6 shrink-0" />
                <span className="flex-1 text-[15px] font-bold tracking-wide">{item.label}</span>
                <Icon icon="material-symbols:lock-outline-rounded" className="w-4 h-4 shrink-0 opacity-50" />
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={`/profile?tab=${item.id}`}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98] ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon
                icon={item.icon}
                className={`w-6 h-6 shrink-0 ${!isActive && "group-hover:text-primary transition-colors"}`}
              />
              <span className={`flex-1 text-[15px] tracking-wide ${isActive ? "font-black" : "font-bold"}`}>
                {item.label}
              </span>
              {item.badge > 0 && (
                <span className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-primary text-white"}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {isAuthenticated && (
          <>
            <div className="my-2 border-t border-dashed border-slate-100 mx-2" />
            <button
              onClick={handleLogout}
              className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all active:scale-[0.98] w-full text-left"
            >
              <Icon icon="material-symbols:logout-rounded" className="w-6 h-6 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="font-black text-[15px] tracking-wide uppercase text-xs">{t('sidebar.logout')}</span>
            </button>
          </>
        )}
      </div>

      {/* Become a Seller Banner */}
      <div className="mt-2 p-6 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col gap-5 relative overflow-hidden group hover:border-primary/40 transition-colors">
        <div className="absolute -right-10 -top-10 text-primary/10 group-hover:rotate-12 transition-transform duration-500">
          <Icon icon="material-symbols:storefront-rounded" className="w-40 h-40" />
        </div>
        <div className="flex flex-col gap-1.5 relative z-10">
          <p className="text-slate-900 text-lg font-black tracking-tight">{t('sellerBanner.title')}</p>
          <p className="text-slate-500 text-sm font-medium leading-relaxed pr-8">{t('sellerBanner.description')}</p>
        </div>
        <Button className="w-full relative z-10 h-12 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all active:scale-[0.98]">
          <Icon icon="material-symbols:add-business-rounded" className="w-5 h-5 mr-2" />
          {t('sellerBanner.action')}
        </Button>
      </div>
    </aside>
  );
};
