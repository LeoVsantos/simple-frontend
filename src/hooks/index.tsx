import React from 'react';

import { AuthProvider } from './useAuth';
import { ProductsProvider } from './useProducts';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProductsProvider>
      {children}
    </ProductsProvider>
  </AuthProvider>
);

export default AppProvider;
