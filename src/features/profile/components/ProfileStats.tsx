"use client";

import React from 'react';
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

export const ProfileStats = () => {
  const t = useTranslations('Profile');

  const stats = [
    { icon: "material-symbols:orders-outline", label: t('stats.orders'), value: "12", color: "text-primary", bg: "bg-primary/5" },
    { icon: "material-symbols:favorite-outline-rounded", label: t('stats.favorites'), value: "38", color: "text-rose-500", bg: "bg-rose-50" },
    { icon: "material-symbols:payments-outline-rounded", label: t('stats.totalSpending'), value: "1.2M", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 delay-100 fill-mode-both">
      {stats.map(({ icon, label, value, color, bg }) => (
        <div key={label} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
          <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
            <Icon icon={icon} className={`w-5 h-5 ${color}`} />
          </div>
          <p className={`text-2xl font-black ${color} tracking-tight`}>{value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
        </div>
      ))}
    </div>
  );
};
