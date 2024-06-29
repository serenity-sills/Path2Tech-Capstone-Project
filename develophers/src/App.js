// App.js

import React, { useState } from 'react';
import Cart from './Cart';

const App = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Soccer Ball',
      price: 25.00,
      image: 'https://example.com/soccer-ball.jpg',
    },
    // Add more items as needed
  ]);

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const checkout = () => {
    // Implement checkout logic here
    console.log('Checkout function');
  };

  return (
    <div>
      <h1>Welcome to Sports Equipment Store</h1>
      <Cart cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
    </div>
  );
};

export default App;



