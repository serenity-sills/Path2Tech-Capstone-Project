import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state;

  const totalPrice = orderDetails.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>

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

      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <h3>Shipping Details:</h3>
      <p>Name: {orderDetails.fullName}</p>
      <p>Email: {orderDetails.email}</p>
      <p>Address: {orderDetails.address}, {orderDetails.city}, {orderDetails.state}, {orderDetails.zip}</p>
    </div>
  );
};

export default Confirmation;




