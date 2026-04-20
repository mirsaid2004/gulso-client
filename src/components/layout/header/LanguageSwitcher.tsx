"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Locale = (typeof routing.locales)[number];

const locales: { code: Locale; label: string; nativeLabel: string }[] = [
    { code: "uz", label: "UZ", nativeLabel: "O'zbek" },
    { code: "ru", label: "RU", nativeLabel: "Русский" },
    { code: "en", label: "EN", nativeLabel: "English" },
];

function FlagImage({ code }: { code: Locale }) {
    return (
        <Image
            src={`/images/${code}.png`}
            alt={code}
            width={20}
            height={14}
            className="rounded-sm object-cover shadow-sm"
        />
    );
}

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const current = locales.find((l) => l.code === locale);

    const handleChange = (newLocale: Locale | null) => {
        if (!newLocale) return;
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="hidden sm:block">
            <Select value={locale} onValueChange={handleChange}>
                <SelectTrigger className="h-10 px-3 gap-2 font-bold text-slate-600 hover:bg-primary/5 hover:text-primary border-none shadow-none bg-transparent rounded-lg focus-visible:ring-0">
                    <SelectValue>
                        <span className="flex items-center gap-2">
                            {current && <FlagImage code={current.code} />}
                            <span className="text-sm font-bold">{current?.label}</span>
                        </span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {locales.map(({ code, label, nativeLabel }) => (
                        <SelectItem key={code} value={code}>
                            <span className="flex items-center gap-2.5">
                                <FlagImage code={code} />
                                <span className="font-bold text-sm">{label}</span>
                                <span className="text-xs text-muted-foreground">{nativeLabel}</span>
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
