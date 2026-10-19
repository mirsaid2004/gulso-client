import { useQuery, queryOptions } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ApiResponse, ProductCategory, ProductResponse, ProductStatus } from '@/types';

export interface ProductsParams {
  search?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  companyId?: number;
  isNew?: boolean;
  isInStock?: boolean;
  hasDiscount?: boolean;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export const getProducts = (
  locale: string,
  params?: ProductsParams
): Promise<ApiResponse<ProductResponse[]>> => {
  return api.get('/products', {
    headers: { 'Accept-Language': locale },
    params: params as Record<string, any>,
  });
};

export const getProductsQueryOptions = (locale: string, params?: ProductsParams) =>
  queryOptions({
    queryKey: ['products', locale, params ?? {}],
    queryFn: () => getProducts(locale, params),
  });

type UseProductsOptions = {
  params?: ProductsParams;
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ params, queryConfig }: UseProductsOptions = {}) => {
  const locale = useLocale();
  return useQuery({
    ...getProductsQueryOptions(locale, params),
    ...queryConfig,
  });
};
