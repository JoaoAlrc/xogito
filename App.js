import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Routes from './src/services/routes';

// React Query config
const queryClient = new QueryClient();

const App = () => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toast />
    </QueryClientProvider>
  </NavigationContainer>
);

export default App;
