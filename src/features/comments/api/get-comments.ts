import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { ApiResponse, CommentResponse } from '@/types';

export const getComments = (
  productId: number | string
): Promise<ApiResponse<CommentResponse[]>> =>
  api.get(`/products/${productId}/comments`);

export const getCommentsQueryOptions = (productId: number | string) =>
  queryOptions({
    queryKey: ['comments', productId],
    queryFn: () => getComments(productId),
  });

export const useComments = (productId: number | string) =>
  useQuery(getCommentsQueryOptions(productId));
