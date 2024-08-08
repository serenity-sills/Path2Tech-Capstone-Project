import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link for navigation
import './Confirmation.css'; // Import CSS for styling
import logo from './assets/logo.png'; // Import the logo image

// Function to generate a random order number
const generateOrderNumber = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

const Confirmation = () => {
  const location = useLocation(); // Get the current location object
  const { state } = location; // Extract the state from location
  const orderDetails = state?.orderDetails || {}; // Get order details from state or use an empty object

  const orderNumber = generateOrderNumber(); // Generate a random order number

  return (
    <div className="confirmation-wrapper"> {/* Wrapper for the confirmation page */}
      <div className="confirmation-page"> {/* Container for the confirmation page */}
        <Link to="/" className="logo-link"> {/* Link to the home page */}
          <img src={logo} alt="Home" className="logo-image" /> {/* Logo image */}
        </Link>
        
        <div className="order-details"> {/* Container for order summary */}
          <h1>Thank You for Your Purchase!</h1>
          <h2>Order Summary</h2>
          <p><strong>Order Number:</strong> {orderNumber}</p>
          <p><strong>Full Name:</strong> {orderDetails.fullName || 'N/A'}</p>
          <p><strong>Email:</strong> {orderDetails.email || 'N/A'}</p>
          
          <div className="address-section"> {/* Container for billing address */}
            <h3>Billing Address:</h3>
            <p>{orderDetails.billingAddress?.street || 'N/A'}, {orderDetails.billingAddress?.suite || ''}</p>
            <p>{orderDetails.billingAddress?.city || 'N/A'}, {orderDetails.billingAddress?.state || 'N/A'}, {orderDetails.billingAddress?.zip || 'N/A'}</p>
          </div>

          <div className="address-section"> {/* Container for shipping address */}
            <h3>Shipping Address:</h3>
            {orderDetails.sameAsBilling ? (
              <p>Same as billing address</p>
            ) : (
              <>
                <p>{orderDetails.shippingAddress?.street || 'N/A'}, {orderDetails.shippingAddress?.suite || ''}</p>
                <p>{orderDetails.shippingAddress?.city || 'N/A'}, {orderDetails.shippingAddress?.state || 'N/A'}, {orderDetails.shippingAddress?.zip || 'N/A'}</p>
              </>
            )}
          </div>

          <div className="payment-method"> {/* Container for payment method */}
            <h3>Payment Method:</h3>
            <p>{orderDetails.paymentMethod || 'N/A'}</p>
          </div>
        </div>

        <div className="confirmation-items"> {/* Container for items summary */}
          <h3>Items:</h3>
          <ul>
            {orderDetails.items?.length > 0 ? (
              orderDetails.items.map((item, index) => ( // Map through order items to display them
                <li key={index} className="confirmation-item"> {/* List item with unique key */}
                  <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="confirmation-item-image" /> {/* Image with alt text */}
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No items found</p> // Message if no items are found
            )}
          </ul>
          <h3>Total:</h3>
          <p>${orderDetails.total?.toFixed(2) || '0.00'}</p> {/* Display total price */}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
