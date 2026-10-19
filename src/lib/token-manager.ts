import { auth } from '@/auth';

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  roles: string[];
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export async function getCurrentToken(): Promise<TokenInfo | null> {
  try {
    if (typeof window !== 'undefined') {
      // Client-side: get from session
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      
      if (session?.accessToken) {
        return {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          accessTokenExpires: Date.now() + 3600 * 1000, // Default 1 hour
          roles: session.roles || [],
        };
      }
    } else {
      // Server-side: use auth()
      const session = await auth();
      
      if (session?.accessToken) {
        return {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          accessTokenExpires: Date.now() + 3600 * 1000, // Default 1 hour
          roles: session.roles || [],
        };
      }
    }
  } catch (error) {
    console.error('Error getting current token:', error);
  }
  
  return null;
}

export async function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const tokenInfo = await getCurrentToken();
      
      if (!tokenInfo?.refreshToken) {
        return false;
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: tokenInfo.refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // The session will be updated automatically by next-auth callbacks
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export function isTokenExpired(tokenInfo: TokenInfo | null): boolean {
  if (!tokenInfo) return true;
  return Date.now() >= tokenInfo.accessTokenExpires;
}

export async function getValidToken(): Promise<TokenInfo | null> {
  const tokenInfo = await getCurrentToken();
  
  if (!tokenInfo) return null;
  
  if (isTokenExpired(tokenInfo)) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Get the new token info after refresh
      return await getCurrentToken();
    }
    return null;
  }
  
  return tokenInfo;
}
