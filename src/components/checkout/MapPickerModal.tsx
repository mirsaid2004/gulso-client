"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface MapPickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (lat: number, lng: number, label: string) => void;
  initialLat?: number;
  initialLng?: number;
}

// Tashkent center
const DEFAULT_LAT = 41.2995;
const DEFAULT_LNG = 69.2401;

// Dynamically import the actual map to avoid SSR issues
const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

export function MapPickerModal({ open, onClose, onConfirm, initialLat, initialLng }: MapPickerModalProps) {
  const t = useTranslations("Checkout");
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!pin) return;
    const label = `${pin.lat.toFixed(5)}, ${pin.lng.toFixed(5)}`;
    onConfirm(pin.lat, pin.lng, label);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Icon icon="material-symbols:location-on-rounded" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 tracking-tight">{t("mapPicker.title")}</h3>
              <p className="text-xs font-bold text-slate-400">{t("mapPicker.subtitle")}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <Icon icon="material-symbols:close-rounded" className="w-5 h-5" />
          </button>
        </div>

        {/* Map */}
        <div className="h-[420px] w-full relative">
          <MapInner
            lat={pin?.lat ?? DEFAULT_LAT}
            lng={pin?.lng ?? DEFAULT_LNG}
            pin={pin}
            onMapClick={(lat, lng) => setPin({ lat, lng })}
          />
          {!pin && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-100 pointer-events-none">
              <p className="text-xs font-black text-slate-600 flex items-center gap-2">
                <Icon icon="material-symbols:touch-app-rounded" className="w-4 h-4 text-primary" />
                {t("mapPicker.tapAnywhere")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4">
          {pin ? (
            <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <Icon icon="material-symbols:location-on-outline-rounded" className="w-4 h-4 text-primary shrink-0" />
              {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
            </p>
          ) : (
            <p className="text-xs font-bold text-slate-400">{t("mapPicker.noLocation")}</p>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border-2 border-slate-100 text-slate-500 font-black text-sm hover:bg-slate-50 transition-colors">
              {t("mapPicker.cancel")}
            </button>
            <button
              onClick={handleConfirm}
              disabled={!pin}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-black text-sm shadow-md shadow-primary/20 hover:bg-primary/95 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              {t("mapPicker.confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
