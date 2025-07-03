'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Avoid refetching immediately after load
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Singleton for browser
let browserQueryClient: QueryClient | null = null;

function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // On server: always create a new client
    return makeQueryClient();
  }
  // On browser: use singleton
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
