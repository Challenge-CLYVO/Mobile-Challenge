import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AppNavigation from "./src/navigation/AppNavigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}