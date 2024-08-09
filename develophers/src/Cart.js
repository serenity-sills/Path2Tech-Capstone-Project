import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  // Constants
  const TAX_RATE = 0.10; // 10% tax rate

  // Calculate subtotal of items in the cart
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate tax based on subtotal
  const tax = subtotal * TAX_RATE;

  // Calculate total price including tax
  const totalPrice = subtotal + tax;

  // Remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Update the quantity of an item in the cart
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {/* Render each item in the cart */}
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.name} - ${item.price.toFixed(2)}</p>
                <p>Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          {/* Display subtotal, tax, and total */}
          <div className="summary-info">
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>Tax: ${tax.toFixed(2)}</h3>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
          {/* Link to proceed to checkout */}
          <Link to="/checkout">
            <button className="checkout-button">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; // Export the Cart component

