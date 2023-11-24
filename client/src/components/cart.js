import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import GooglePay from "./Payment";
import "./cart.css"

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
    return cartItems.reduce((total, item) => parseInt(total) + parseInt(item.cost), 0);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>${item.cost}</p>
              <button className="remove-button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="total-section">
            <p>Total Items: {cartItems.length}</p>
            <p>Total Cost: ${getTotalCost()}</p>
            <button className="clear-button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <GooglePay />
        </div>
      )}
    </div>
  );
};

export default Cart;