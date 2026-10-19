'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from 'react';
import { MswWorker } from '@/components/layout/MswWorker';
import { SessionProviderWrapper } from '@/components/providers/session-provider';
import { StoreHydration } from '@/components/StoreHydration';
import { NotificationProvider } from '@/features/notifications/NotificationProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MswWorker>
      <SessionProviderWrapper>
        <QueryClientProvider client={queryClient}>
          <StoreHydration />
          <NotificationProvider />
          {children}
          <Toaster />
        </QueryClientProvider>
      </SessionProviderWrapper>
    </MswWorker>
  );
};
