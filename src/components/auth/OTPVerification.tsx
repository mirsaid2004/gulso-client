'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (code: string) => void;
}

export function OTPVerification({
  phoneNumber,
  onVerify,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        'w-full max-w-md mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:border border-slate-100 p-6 sm:p-10 flex flex-col items-center text-center gap-8'
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full mt-4 sm:mt-0">
        <div className="w-16 h-16 shrink-0 rounded-full bg-primary/10 flex items-center justify-center shadow-inner text-primary">
          <Icon
            icon="material-symbols:lock-outline-rounded"
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Tasdiqlash
        </h1>
        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-xs mx-auto">
          Tasdiqlash kodi{' '}
          <span className="font-bold text-slate-900">
            +998{' '}
            {phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')}
          </span>{' '}
          raqamiga yuborildi
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="w-full mt-2">
        <fieldset className="flex justify-between gap-2 w-full max-w-[320px] mx-auto">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-black rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-0 bg-slate-50 focus:bg-white outline-none transition-all shadow-sm focus:shadow-md text-slate-900"
              maxLength={1}
              type="number"
            />
          ))}
        </fieldset>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-4 w-full mt-2">
        <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 shadow-sm">
          <Icon
            icon="material-symbols:schedule-rounded"
            className="text-primary w-4 h-4"
          />
          <p className="text-primary font-bold text-sm tracking-wide">00:59</p>
        </div>
        <button
          className="text-slate-400 text-sm font-bold hover:text-primary transition-colors disabled:opacity-50 mt-1"
          disabled
        >
          Kodni qayta yuborish
        </button>
      </div>

      {/* Action Button */}
      <div className="w-full pt-4">
        <Button
          onClick={handleVerify}
          disabled={otp.join('').length < 6}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 text-base disabled:opacity-50"
        >
          Tasdiqlash
        </Button>
      </div>

      {/* Footer Support */}
      <p className="text-slate-400 text-xs font-semibold">
        Kod kelmadimi?{' '}
        <a className="text-primary hover:underline font-bold" href="#">
          Yordam markazi
        </a>{' '}
        bilan bog'laning
      </p>

      {/* Hide number arrows style */}
      <style jsx global>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
