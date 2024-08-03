import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';
import Cart from './Cart';
import CheckoutPage from './Checkout';
import Confirmation from './Confirmation';
import Policy from './Policy';  // Include Policy component
import About from './About';   // Include About component

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/about" element={<About />} /> {/* Include About route */}
        <Route path="/policy" element={<Policy />} /> {/* Include Policy route */}
      </Routes>
    </Router>
  );
};

export default App;


