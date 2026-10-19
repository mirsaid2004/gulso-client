'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { MutationConfig } from '@/lib/react-query';

type VerifyOtpInput = {
  phone: string;
  otp: string;
};

export const verifyOtp = async (data: VerifyOtpInput) => {
  const result = await signIn('credentials', {
    phone: data.phone,
    otp: data.otp,
    redirect: false,
  });

  // signIn always returns HTTP 200; auth failures land in result.error
  if (result?.error) {
    throw new Error(result.error);
  }

  if (!result?.ok) {
    throw new Error('Invalid OTP');
  }

  return result;
};

type UseVerifyOtpOptions = {
  mutationConfig?: MutationConfig<typeof verifyOtp>;
};

export const useVerifyOtp = ({ mutationConfig }: UseVerifyOtpOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: verifyOtp,
    onSuccess: async (...args) => {
      // Invalidate without blocking — user data loads when needed
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
      onSuccess?.(...args);
    },
  });
};
