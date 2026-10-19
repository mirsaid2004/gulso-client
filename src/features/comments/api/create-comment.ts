import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { ApiResponse, CommentResponse, CreateCommentRequest } from '@/types';

export const createComment = (
  productId: number | string,
  data: CreateCommentRequest
): Promise<ApiResponse<CommentResponse>> =>
  api.post(`/products/${productId}/comments`, data);

type UseCreateCommentOptions = {
  productId: number | string;
  mutationConfig?: Omit<
    UseMutationOptions<ApiResponse<CommentResponse>, Error, CreateCommentRequest>,
    'mutationFn'
  >;
};

export const useCreateComment = ({ productId, mutationConfig }: UseCreateCommentOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: (data: CreateCommentRequest) => createComment(productId, data),
    onSuccess: async (...args) => {
      queryClient.invalidateQueries({ queryKey: ['comments', productId] });
      onSuccess?.(...args);
    },
  });
};
