import { useQuery, queryOptions } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ApiResponse, ProductDetailedResponse } from '@/types';

export const getProduct = (
  id: number | string,
  locale: string
): Promise<ApiResponse<ProductDetailedResponse>> =>
  api.get(`/products/${id}`, {
    headers: { 'Accept-Language': locale },
  });

export const getProductQueryOptions = (id: number | string, locale: string) =>
  queryOptions({
    queryKey: ['product', id, locale],
    queryFn: () => getProduct(id, locale),
  });

type UseProductOptions = {
  id: number | string;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ id, queryConfig }: UseProductOptions) => {
  const locale = useLocale();
  return useQuery({
    ...getProductQueryOptions(id, locale),
    ...queryConfig,
  });
};
