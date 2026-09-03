import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './src/config/queryClient';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}