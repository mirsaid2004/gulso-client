import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { ApiResponse, CompanyResponse } from '@/types';

export const getCompany = (id: number | string): Promise<ApiResponse<CompanyResponse>> =>
  api.get(`/company/${id}/profile`);

export const getCompanyQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: ['company', id],
    queryFn: () => getCompany(id),
  });

export const useCompany = (id: number | string) =>
  useQuery(getCompanyQueryOptions(id));
