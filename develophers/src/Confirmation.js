import React from 'react';
import { useLocation } from 'react-router-dom'; // Use this to get info passed from the previous page

const Confirmation = () => {
  const location = useLocation(); // Get the location info
  const { orderDetails } = location.state; // Get order details from the location

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
        {orderDetails.items.map(item => ( // List all ordered items
          <li key={item.id}>
            <div>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} /> {/* Show item image */}
            </div>
            <div>
              <p>{item.name} - ${item.price.toFixed(2)} - Quantity: {item.quantity}</p> {/* Show item name, price, and quantity */}
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
      <p>Name: {orderDetails.fullName}</p> {/* Show the name */}
      <p>Email: {orderDetails.email}</p> {/* Show the email */}
      <p>Billing Address: {orderDetails.billingAddress.street}, {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}, {orderDetails.billingAddress.zip}</p> {/* Show the billing address */}
      
      {/* Conditionally show shipping address if different from billing */}
      {!orderDetails.sameAsBilling && (
        <p>Shipping Address: {orderDetails.shippingAddress.street}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}, {orderDetails.shippingAddress.zip}</p>
      )}
    </div>
  );
};

export default Confirmation;
