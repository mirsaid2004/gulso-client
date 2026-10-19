'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Image } from '@/components/ui/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useSendOtp } from '../api/send-otp';

interface LoginFormProps {
  onSubmit: (phone: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const t = useTranslations('Auth.login');
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  
  const sendOtpMutation = useSendOtp({
    mutationConfig: {
      onSuccess: () => {
        onSubmit(phone);
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      const rawPhone = `+998${phone.replace(/\s/g, '')}`;
      sendOtpMutation.mutate({ phone: rawPhone });
    }
  };
  
  const isLoading = sendOtpMutation.isPending;

  const hanleFormatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');

    const trimmed = digits.substring(0, 9);
    console.log(trimmed);
    const part1 = trimmed.substring(0, 2);
    const part2 = trimmed.substring(2, 5);
    const part3 = trimmed.substring(5, 7);
    const part4 = trimmed.substring(7, 9);
    console.log(part1, part2, part3, part4);

    if (trimmed.length > 7) return `${part1} ${part2} ${part3} ${part4}`;
    if (trimmed.length > 5) return `${part1} ${part2} ${part3}`;
    if (trimmed.length > 2) return `${part1} ${part2}`;
    return part1;
  };

  const isValidPhoneFormat = (value: string) => {
    const regex = /^\d{2} \d{3} \d{2} \d{2}$/;
    return regex.test(value);
  };

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        'w-full max-w-md mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:border border-slate-100 p-6 sm:p-10 flex flex-col gap-8'
      )}
    >
      {/* Brand Section */}
      <div className="flex flex-col items-center text-center gap-3 mt-4 sm:mt-0">
        <div className="flex items-center gap-2 mb-2">
          <Image src="/images/logo.svg" alt="Gulso" width={48} height={48} />
          <span className="text-3xl font-black text-primary tracking-tighter">Gulso</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {t('welcome')}
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          {t('subtitle')}
        </p>
      </div>

      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        {/* Phone Number */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-bold text-slate-700 px-1">
            {t('phoneNumberLabel')}
          </label>
          <div className="relative flex items-center group w-full">
            <div className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center bg-slate-50 border-r border-slate-200 rounded-l-xl z-10 transition-colors group-focus-within:border-primary/50 group-focus-within:bg-primary/5">
              <span className="text-slate-600 font-bold text-sm">+998</span>
            </div>

            <Input
              className="w-full pl-24 pr-4 h-14 rounded-xl border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary outline-none transition-all font-extrabold text-lg shadow-sm tracking-widest text-slate-900"
              placeholder={t('placeholder')}
              type="tel"
              value={phone}
              onChange={(e) => {
                const formattedValue = hanleFormatPhone(e.target.value);
                setPhone(formattedValue);
                const isValid = isValidPhoneFormat(formattedValue);
                if (isValid) setIsValidPhone(isValid);
              }}
            />
          </div>
          <p className="text-xs font-bold text-slate-400 px-1 mt-1 text-center">
            {t('smsInfo')}
          </p>
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          disabled={!isValidPhone || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 text-base mt-2"
        >
          {isLoading ? (
            <Icon icon="line-md:loading-twotone-loop" className="w-6 h-6" />
          ) : (
            <>
              <span>{t('sendCode')}</span>
              <Icon
                icon="material-symbols:arrow-forward-rounded"
                className="w-5 h-5"
              />
            </>
          )}
        </Button>
      </form>

      {/* Footer Links */}
      <div className="text-center mt-2 w-full">
        <p className="text-xs font-semibold text-slate-400">
          {t('termsPrefix')} <br />
          <a className="text-primary hover:underline font-bold" href="#">
            {t('termsLink')}
          </a>
          {t('termsSuffix')}
        </p>
      </div>
    </div>
  );
}
