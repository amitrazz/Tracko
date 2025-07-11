import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
};
