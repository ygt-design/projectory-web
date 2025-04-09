import { createContext, useState, useContext, ReactNode } from 'react';

interface LikedProductsContextValue {
  likedProducts: string[];
  toggleLike: (productId: string) => void;
}

const LikedProductsContext = createContext<LikedProductsContextValue | undefined>(undefined);

export const LikedProductsProvider = ({ children }: { children: ReactNode }) => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  return (
    <LikedProductsContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikedProductsContext.Provider>
  );
};

export const useLikedProducts = (): LikedProductsContextValue => {
  const context = useContext(LikedProductsContext);
  if (!context) {
    throw new Error('useLikedProducts must be used within a LikedProductsProvider');
  }
  return context;
};