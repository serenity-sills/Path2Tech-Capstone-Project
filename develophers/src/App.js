import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';
import Cart from './Cart';
import CheckoutPage from './Checkout';
import Confirmation from './Confirmation';
// import About from './About';

const App = () => {
  // State to manage the shopping cart
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // If the product is already in the cart, increase its quantity
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // If the quantity is less than 1, remove the product from the cart
      removeFromCart(productId);
    } else {
      // Update the quantity of the product in the cart
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <Router>
      <Routes>
        {/* Route for the Product Page */}
        <Route path="/" element={<ProductPage addToCart={addToCart} />} />

        {/* Route for the Cart Page */}
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />

        {/* Route for the Checkout Page */}
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />

        {/* Route for the Stripe Payment Page */}
        <Route path="/payment" element={<StripePaymentWrapper cart={cart} />} />

        {/* Route for the Confirmation Page */}
        <Route path="/confirmation" element={<Confirmation />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};
export default App;