import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import Home from './src';

// React Query config
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
    <Toast />
  </QueryClientProvider>
);

export default App;
