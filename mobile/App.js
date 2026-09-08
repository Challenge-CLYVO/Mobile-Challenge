import { QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from './src/navigation/AppNavigator';

import { queryClient } from './src/config/queryClient';

import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}