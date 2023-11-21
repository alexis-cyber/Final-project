import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import GooglePay from "./Payment";

const Cart = () => {
  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (error) {
    console.log("Invalid token", error);
  }

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || []
  );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(`cartItems_${decoded?.id}`);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify(updatedCart));
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.cost, 0);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.cost}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <p>Total Items: {cartItems.length}</p>
          <button onClick={clearCart}>Clear Cart</button>

          {/* GooglePay component */}
          <GooglePay />
        </div>
      )}
    </div>
  );
};

export default Cart;