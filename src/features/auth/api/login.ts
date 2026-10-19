import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { LoginWithOtpRequest, AuthResponse, ApiResponse } from '@/types';
import { getUserQueryOptions } from './get-user';

export const loginWithOtp = (data: LoginWithOtpRequest): Promise<ApiResponse<AuthResponse>> => {
  return api.post('/auth/otp/login', data);
};

type UseLoginWithOtpOptions = {
  mutationConfig?: MutationConfig<typeof loginWithOtp>;
};

export const useLoginWithOtp = ({
  mutationConfig,
}: UseLoginWithOtpOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: loginWithOtp,
  });
};
