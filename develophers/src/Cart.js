// Cart.js

import React from 'react';

const Cart = ({ cart, removeFromCart, checkout }) => {
  // Function to calculate total price of items in the cart
  const calculateCartTotal = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2); // Ensure total price is formatted to 2 decimal places
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <div>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
            </div>
            <div>
              <p>{item.name} - ${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateCartTotal()}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;

