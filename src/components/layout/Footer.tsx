import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

const footerLinks = {
  buyers: [
    { label: "Yetkazib berish", href: "#" },
    { label: "To'lov usullari", href: "#" },
    { label: "Qaytarish siyosati", href: "#" },
    { label: "Savol va javoblar", href: "#" },
  ],
  company: [
    { label: "Biz haqimizda", href: "#" },
    { label: "Hamkorlik", href: "#" },
    { label: "Vakansiyalar", href: "#" },
    { label: "Kontaktlar", href: "#" },
  ],
  sellers: [
    { label: "Do'kon ochish", href: "#" },
    { label: "Sotuvchi qo'llanmasi", href: "#" },
    { label: "Komissiyalar", href: "#" },
    { label: "Muvaffaqiyat tarixi", href: "#" },
  ],
};

const socialLinks = [
  { icon: "mdi:instagram", href: "#", label: "Instagram" },
  { icon: "mdi:telegram", href: "#", label: "Telegram" },
  { icon: "mdi:facebook", href: "#", label: "Facebook" },
  { icon: "mdi:youtube", href: "#", label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5 pr-0 lg:pr-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Gulso Logo"
                width={35}
                height={35}
                className="hidden sm:block"
              />
              <span className="text-2xl font-black text-primary tracking-tighter">
                Gulso
              </span>
            </div>

            {/* Tagline */}
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
              Eng go'zal gullar va unutilmas sovg'alar — har qanday bayraming
              eng ajoyib qismiga aylanamiz.
            </p>

            {/* Contact quick-links */}
            <div className="space-y-2.5">
              <a
                href="tel:+998711234567"
                className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                <Icon
                  icon="material-symbols:call-outline-rounded"
                  className="w-4 h-4 text-primary shrink-0"
                />
                +998 (71) 123-45-67
              </a>
              <a
                href="mailto:hello@gulso.uz"
                className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
              >
                <Icon
                  icon="material-symbols:mail-outline-rounded"
                  className="w-4 h-4 text-primary shrink-0"
                />
                hello@gulso.uz
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Icon
                  icon="material-symbols:location-on-outline-rounded"
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                />
                <span className="font-medium">
                  Toshkent sh., Amir Temur ko'chasi, 12
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Icon icon={icon} className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column: Buyers */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">
              Xaridorlar uchun
            </h4>
            <ul className="space-y-3">
              {footerLinks.buyers.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Sellers */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">
              Sotuvchilar uchun
            </h4>
            <ul className="space-y-3">
              {footerLinks.sellers.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Company */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">
              Kompaniya
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {year} Gulso. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-3">
            {/* Payment methods */}
            {["Uzcard", "Humo", "Visa", "MC"].map((card) => (
              <span
                key={card}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-black text-slate-500 tracking-wide"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
