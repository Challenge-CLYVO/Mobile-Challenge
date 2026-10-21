import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './src/config/queryClient';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
