import React, { createContext, useContext, useState } from "react";

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type ProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  // name: string;
  quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ProviderProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartQuantity = cartItems.reduce((acc, cur)=> acc + cur.quantity, 0);

  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id: number) => {
    // return cartItems.map(item => item.id === id ? ({ ...item, quantity: item.quantity += 1 }) : ({ ...item }));
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id) === undefined) {
        console.log(currItems.find(item => item.id));
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity += 1 };
          } else {
            return item;
          }
        })
      }
    })
  };

  const decreaseQuantity = (id: number) => {
    // return cartItems.map(item => item.id === id ? ({ ...item, equantity: item.quantity -= 1}) : ({ ...item }))
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id)?.quantity !== 1) {
        return currItems.map(item => item.id === id ? ({ ...item, quantity: item.quantity -=1 }) : item);
      } else {
        return currItems.filter(item => item.id === id);
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(currItems => currItems.filter(item => item.id !== id));
  };

  const openCart = () => setCartOpen(true);

  const closeCart = () => setCartOpen(false);

  return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
