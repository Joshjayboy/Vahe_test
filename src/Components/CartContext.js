import React, { createContext, useContext, useState } from "react";
export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ addToCart, children }) => {
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (foods) => {
    setCartItems((prevCartItems) => [...prevCartItems, foods]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart: handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};
