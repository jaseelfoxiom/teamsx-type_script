import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Define the props type for the ReactQueryClientProvider component
interface ReactQueryClientProviderProps {
  children: ReactNode; // children can be any valid React node (elements, strings, numbers, etc.)
}

export const ReactQueryClientProvider: React.FC<ReactQueryClientProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
