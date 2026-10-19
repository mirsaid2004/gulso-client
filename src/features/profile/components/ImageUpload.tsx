"use client";

import React, { useRef, useState } from 'react';
import { Icon } from "@iconify/react";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type ImageUploadProps = {
  currentImage?: string;
  onImageSelect: (dataUrl: string) => void;
};

export const ImageUpload = ({ currentImage, onImageSelect }: ImageUploadProps) => {
  const t = useTranslations("Profile");
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onImageSelect(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="relative w-32 h-32 rounded-4xl border-4 border-primary/10 overflow-hidden bg-slate-50 shadow-inner group">
        {preview ? (
          <Image src={preview} alt="Profile" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Icon icon="material-symbols:person-rounded" className="w-16 h-16" />
          </div>
        )}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Icon icon="material-symbols:add-a-photo-outline-rounded" className="w-8 h-8 text-white" />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        variant="ghost"
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5"
      >
        {t("personalInfo.changeAvatar")}
      </Button>
    </div>
  );
};
