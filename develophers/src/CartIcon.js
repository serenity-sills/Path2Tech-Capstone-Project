import React from 'react';

const CartIcon = () => {
  // Logic to get the number of items in the cart
  const itemCount = 5; // Replace with actual logic to get the cart count

  return (
    <div className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;

