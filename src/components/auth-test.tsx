'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function AuthTest() {
  const { user, isAuthenticated, isLoading, accessToken, refreshToken, roles, logout } = useAuth();

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>
      
      <div className="space-y-2">
        <p><strong>Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
        
        {isAuthenticated && (
          <>
            <p><strong>User:</strong> {user?.name}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Roles:</strong> {roles.join(', ')}</p>
            <div className="mt-4">
              <p><strong>Access Token:</strong></p>
              <code className="block p-2 bg-gray-100 rounded text-xs break-all">
                {accessToken}
              </code>
            </div>
            <div className="mt-4">
              <p><strong>Refresh Token:</strong></p>
              <code className="block p-2 bg-gray-100 rounded text-xs break-all">
                {refreshToken}
              </code>
            </div>
            <Button onClick={logout} className="mt-4">
              Logout
            </Button>
          </>
        )}
        
        {!isAuthenticated && (
          <p className="text-red-600">Please sign in to test authentication</p>
        )}
      </div>
    </div>
  );
}
