import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UserResponse, ApiResponse } from '@/types';

export type UpdateUserDTO = {
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
  birthday?: string | null;
};

export const updateUser = (data: UpdateUserDTO): Promise<ApiResponse<UserResponse>> => {
  return api.patch('/users/me', data);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ mutationConfig }: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
    ...mutationConfig,
    mutationFn: updateUser,
  });
};
