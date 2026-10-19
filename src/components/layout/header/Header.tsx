"use client";

import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import CatalogMenu from "./CatalogMenu";
import SearchBar from "./SearchBar";
import { User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Image } from "@/components/ui/image";
import { useUser } from "@/features/auth/api/get-user";
import { NotificationPopover } from "@/features/notifications/components/NotificationPopover";

export default function Header() {
  const t = useTranslations('Layout.header');
  const { data: userResponse } = useUser();
  const user = userResponse?.success ? userResponse.data : null;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-6 py-3 flex items-center justify-between w-full transition-all gap-4">
        {/* Logo and Catalog */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Logo" width={35} height={35} />
            <h1 className="text-2xl font-black text-primary tracking-tighter hidden sm:block">
              Gulso
            </h1>
          </Link>

          <CatalogMenu />
        </div>

        {/* Search */}
        <SearchBar />

        {/* Right utilities */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <LanguageSwitcher />
          <WishlistButton />
          <CartButton />

          {user ? (
            <div className="flex items-center gap-2 ">
              <NotificationPopover />
              <Link href="/profile" className="flex items-center">
                <Button
                  variant="ghost"
                  className="p-0 h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary transition-all overflow-hidden"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-95 sm:ml-2 font-bold rounded-xl h-auto"
              >
                <User className="w-5 h-5 shrink-0" />
                <span className="hidden md:inline text-sm">{t('login')}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
