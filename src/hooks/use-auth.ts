'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;
  const roles = session?.roles || [];

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  const hasRole = (role: string) => {
    return roles.includes(role);
  };

  const hasAnyRole = (roleList: string[]) => {
    return roleList.some(role => roles.includes(role));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    roles,
    logout,
    hasRole,
    hasAnyRole,
    session,
  };
}
