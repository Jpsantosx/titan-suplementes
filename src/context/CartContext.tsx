"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  peso: string;
  sabor: string;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantidade"> & { quantidade?: number }) => void;
  removeFromCart: (id: number, sabor: string) => void;
  updateQuantity: (id: number, sabor: string, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedCart = localStorage.getItem("titan_cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });
  const [isLoaded, setIsLoaded] = useState(() => typeof window !== "undefined");

  // Salvar no localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("titan_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (newItem: Omit<CartItem, "quantidade"> & { quantidade?: number }) => {
    const qtyToAdd = newItem.quantidade || 1;
    setCart((prevCart) => {
      // Procurar se o item com o mesmo ID e mesmo Sabor já existe
      const index = prevCart.findIndex(
        (item) => item.id === newItem.id && item.sabor === newItem.sabor
      );

      if (index > -1) {
        // Incrementa quantidade
        const updatedCart = [...prevCart];
        updatedCart[index].quantidade += qtyToAdd;
        return updatedCart;
      } else {
        // Adiciona novo item
        return [...prevCart, { ...newItem, quantidade: qtyToAdd }];
      }
    });
  };

  const removeFromCart = (id: number, sabor: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.sabor === sabor))
    );
  };

  const updateQuantity = (id: number, sabor: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(id, sabor);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.sabor === sabor ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
