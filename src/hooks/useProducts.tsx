import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string | number;
  weight: number;
  package_type: string;
  package_quantity: number;
  createdAt: Date;
}

type ProductInput = Omit<IProduct, 'id' | 'createdAt'>;

interface ProductsProviderProps {
  children: ReactNode
}

interface ProductsContextData {
  products: IProduct[];
  createProduct: (product: ProductInput) => Promise<void>;
  searchProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    searchProducts();
  }, []);

  async function searchProducts(){
    const response = await api.get('products/list');
    setProducts(response.data.products)
  }

  async function createProduct(productInput: ProductInput) {
    const response = await api.post('/products/create', productInput);
    const { product } = response.data;
    
    setProducts([
      ...products,
      product,
    ]);
  }


  return (
    <ProductsContext.Provider value={{ products, createProduct, searchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}