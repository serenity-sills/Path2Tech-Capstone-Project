import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {}; // Destructure orderDetails with a default empty object

  if (!orderDetails) {
    // Handle cases where orderDetails is not available
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>No order details found.</p>
      </div>
    );
  }

  // Calculate the total price of the order
  const totalPrice = orderDetails.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>

      {/* Show a random order number */}
      <h3>Order Number: {Math.floor(Math.random() * 100000)}</h3>
      <h3>Items:</h3>
      <ul>
        {orderDetails.items.map(item => (
          <li key={item.id}>
            <div>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
            </div>
            <div>
              <p>{item.name} - ${item.price.toFixed(2)} - Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Show the total price */}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      {/* Show the payment method */}
      <h3>Payment Method:</h3>
      <p>{orderDetails.paymentMethod}</p>

      <h3>Shipping Details:</h3>
      <p>Name: {orderDetails.fullName}</p>
      <p>Email: {orderDetails.email}</p>
      <p>Billing Address: {orderDetails.billingAddress.street}, {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}, {orderDetails.billingAddress.zip}</p>
      
      {/* Conditionally show shipping address if different from billing */}
      {!orderDetails.sameAsBilling && (
        <p>Shipping Address: {orderDetails.shippingAddress.street}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.zip}</p>
      )}
    </div>
  );
};

export default Confirmation;

