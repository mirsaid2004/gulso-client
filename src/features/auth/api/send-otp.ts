import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { SendOtpRequest, ApiResponse } from '@/types';

export const sendOtp = (data: SendOtpRequest): Promise<ApiResponse<string>> => {
  return api.post('/auth/otp/send', data);
};

type UseSendOtpOptions = {
  mutationConfig?: MutationConfig<typeof sendOtp>;
};

export const useSendOtp = ({
  mutationConfig,
}: UseSendOtpOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: sendOtp,
  });
};
