import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  // Constants
  const TAX_RATE = 0.10; // 10% tax rate

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate tax
  const tax = subtotal * TAX_RATE;

  // Calculate total
  const totalPrice = subtotal + tax;

  // Function to handle removal of a product from the cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Function to handle quantity change of a product in the cart
  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {/* Display each item in the cart */}
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
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <h3>Tax: ${tax.toFixed(2)}</h3>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      {/* Link to proceed to checkout */}
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
