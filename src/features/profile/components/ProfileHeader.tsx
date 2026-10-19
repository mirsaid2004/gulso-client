"use client";

import React from 'react';
import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { useTranslations } from "next-intl";
import { UserResponse } from "@/types";

type ProfileHeaderProps = {
  user: UserResponse;
  onEditClick: () => void;
};

export const ProfileHeader = ({ user, onEditClick }: ProfileHeaderProps) => {
  const t = useTranslations('Profile');

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between sm:items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex gap-6 items-center">
          <div className="relative w-24 h-24 shrink-0 rounded-4xl border-4 border-primary/10 overflow-hidden bg-slate-50">
            {user.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                <Icon icon="material-symbols:person-rounded" className="w-12 h-12" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 text-2xl sm:text-3xl font-black tracking-tight">{user.name}</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 mt-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg w-fit">
              <Icon icon="material-symbols:call-outline-rounded" className="w-5 h-5 text-primary" />
              {user.phone || t('personalInfo.demoPhone')}
            </p>
          </div>
        </div>
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 rounded-2xl h-14 sm:h-12 px-6 sm:px-8 bg-primary/10 text-primary font-black hover:bg-primary/20 hover:text-primary transition-all active:scale-[0.98] w-full sm:w-auto mt-4 sm:mt-0 shadow-sm shadow-primary/5"
        >
          <Icon icon="material-symbols:edit-outline-rounded" className="w-5 h-5" />
          <span className="truncate tracking-wide uppercase text-xs">{t('header.edit')}</span>
        </button>
      </div>
    </div>
  );
};
