import { useQuery, queryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { UserResponse, ApiResponse } from '@/types';

export const getUser = (): Promise<ApiResponse<UserResponse>> => {
  return api.get('/users/me');
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user-me'],
    queryFn: () => getUser(),
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  const { status } = useSession();
  return useQuery({
    ...getUserQueryOptions(),
    enabled: status === 'authenticated',
    ...queryConfig,
  });
};
