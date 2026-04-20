'use client';

import { Activity, useState } from 'react';
import { LoginForm } from './LoginForm';
import { OTPVerification } from './OTPVerification';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/routing';
import { useRouter } from 'next/navigation';

export enum AuthStep {
  PHONE_ENTRY = 'PHONE_ENTRY',
  VERIFICATION = 'VERIFICATION',
}

export function AuthFlow() {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE_ENTRY);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setStep(AuthStep.VERIFICATION);
  };

  const handleBack = () => {
    setStep(AuthStep.PHONE_ENTRY);
  };

  const handleVerificationComplete = () => {
    // Navigate home after successful sign-in
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative w-full overflow-hidden">
        {/* Decorative background blur gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10 mx-auto">
          <Activity mode={step === AuthStep.PHONE_ENTRY ? 'visible' : 'hidden'}>
            <LoginForm onSubmit={handlePhoneSubmit} />
          </Activity>
          <Activity
            mode={step === AuthStep.VERIFICATION ? 'visible' : 'hidden'}
          >
            <OTPVerification
              phoneNumber={phoneNumber}
              onVerify={handleVerificationComplete}
            />
          </Activity>
        </div>
      </main>

      {/* Footer */}
      {step === 'PHONE_ENTRY' && (
        <footer className="flex-none py-6 px-6 text-center text-slate-400 text-xs font-semibold tracking-wide bg-slate-50 z-10">
          © {new Date().getFullYear()} Gulso 1.0. Barcha huquqlar himoyalangan.
        </footer>
      )}
    </div>
  );
}
