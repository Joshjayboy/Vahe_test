import React from "react";
import { useCartContext } from "./CartContext";
function Cart() {
  const { cartItems } = useCartContext();
  const renderCartItems = () => {
    return cartItems.map((foods, index) => (
      <li key={index}>
        <h3>{foods.title}</h3>
        <p>Price: ${foods.price}</p>
      </li>
    ));
  };
  return (
    <>
      this is the cart
      <div>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>{renderCartItems()}</ul>
        )}
      </div>
    </>
  );
}
export default Cart;