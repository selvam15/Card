
import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product, UserProfile } from '../types';

export function useAppStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const saveUser = useCallback((profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    user,
    saveUser,
    clearCart,
  };
}
