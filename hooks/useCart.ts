'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/utils';
import { Product, CartItem } from '@/lib/types';

const CART_KEY = 'solaris-cart';

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get<CartItem[]>(CART_KEY, []);
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set(CART_KEY, cart);
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });

    openCart();
  }, [products]);

  // Remove item from cart
  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  }, []);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Get cart count
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Open cart
  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  // Close cart
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    openCart,
    closeCart,
    clearCart,
  };
}
