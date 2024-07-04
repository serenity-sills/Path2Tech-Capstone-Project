import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StripePayment from './StripePayment'; // Replace with your payment component

// Define the validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  billingAddress: yup.object().shape({
    street: yup.string().required('Street address is required'),
    suite: yup.string(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zip: yup.string().required('Zip code is required'),
  }),
  shippingAddress: yup.object().shape({
    street: yup.string().required('Street address is required'),
    suite: yup.string(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zip: yup.string().required('Zip code is required'),
  }),
  sameAsBilling: yup.boolean(),
  paymentMethod: yup.string().required('Payment method is required'),
  shippingMethod: yup.string().required('Shipping method is required'),
});

const CheckoutPage = ({ cart }) => {
  const navigate = useNavigate(); // Use navigate to programmatically navigate
  const [sameAsBilling, setSameAsBilling] = useState(true); // State for tracking if shipping address is the same as billing
  const [isConfirming, setIsConfirming] = useState(false); // State for tracking if the user is confirming the order
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // State for tracking selected payment method
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Initialize the form with react-hook-form and Yup validation
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sameAsBilling: true,
    },
  });

  const watchSameAsBilling = watch("sameAsBilling"); // Watch for changes to the "sameAsBilling" field

  // Calculate subtotal, tax, and total based on cart items
  useEffect(() => {
    const calculateTotals = () => {
      const subtotalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const taxValue = subtotalValue * 0.10; // Assuming 10% tax rate
      const totalValue = subtotalValue + taxValue;
      setSubtotal(subtotalValue);
      setTax(taxValue);
      setTotal(totalValue);
    };

    calculateTotals();
  }, [cart]);

  // Handle form submission
  const onSubmit = (data) => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    // Handle form submission, integrate with payment gateway, etc.
    console.log('Form submitted:', data);
    // Navigate to confirmation page
    navigate('/confirmation', { state: { orderDetails: { ...data, items: cart, total } } });
  };

  // Handle changes to the selected payment method
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Render additional fields based on the selected payment method
  const renderPaymentFields = () => {
    switch (selectedPaymentMethod) {
      case 'credit':
        return <StripePayment />;
      case 'apple':
        return (
          <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noopener noreferrer">
            <button>Pay with Apple Pay</button>
          </a>
        );
      case 'google':
        return (
          <a href="https://pay.google.com" target="_blank" rel="noopener noreferrer">
            <button>Pay with Google Pay</button>
          </a>
        );
      case 'paypal':
        return (
          <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
            <button>Pay with Paypal</button>
          </a>
        );
      case 'klarna':
        return (
          <a href="https://www.klarna.com" target="_blank" rel="noopener noreferrer">
            <button>Pay with Klarna</button>
          </a>
        );
      case 'afterpay':
        return (
          <a href="https://www.afterpay.com" target="_blank" rel="noopener noreferrer">
            <button>Pay with AfterPay</button>
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
      <div className="items-summary">
        <h2>Items in Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Checkout</h2>
          <div>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" {...register('fullName')} />
            <p>{errors.fullName?.message}</p>
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="example@example.com" {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <h3>Billing Address</h3>
            <label>Street Address</label>
            <input type="text" placeholder="123 Main St" {...register('billingAddress.street')} />
            <p>{errors.billingAddress?.street?.message}</p>
            <label>Suite/Apartment (optional)</label>
            <input type="text" placeholder="Suite 100" {...register('billingAddress.suite')} />
            <label>City</label>
            <input type="text" placeholder="City" {...register('billingAddress.city')} />
            <p>{errors.billingAddress?.city?.message}</p>
            <label>State</label>
            <input type="text" placeholder="State" {...register('billingAddress.state')} />
            <p>{errors.billingAddress?.state?.message}</p>
            <label>Zip Code</label>
            <input type="text" placeholder="12345" {...register('billingAddress.zip')} />
            <p>{errors.billingAddress?.zip?.message}</p>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register('sameAsBilling')} checked={watchSameAsBilling} onChange={(e) => setSameAsBilling(e.target.checked)} />
              Shipping address same as billing
            </label>
          </div>
          {!sameAsBilling && (
            <div>
              <h3>Shipping Address</h3>
              <label>Street Address</label>
              <input type="text" placeholder="123 Main St" {...register('shippingAddress.street')} />
              <p>{errors.shippingAddress?.street?.message}</p>
              <label>Suite/Apartment (optional)</label>
              <input type="text" placeholder="Suite 100" {...register('shippingAddress.suite')} />
              <label>City</label>
              <input type="text" placeholder="City" {...register('shippingAddress.city')} />
              <p>{errors.shippingAddress?.city?.message}</p>
              <label>State</label>
              <input type="text" placeholder="State" {...register('shippingAddress.state')} />
              <p>{errors.shippingAddress?.state?.message}</p>
              <label>Zip Code</label>
              <input type="text" placeholder="12345" {...register('shippingAddress.zip')} />
              <p>{errors.shippingAddress?.zip?.message}</p>
            </div>
          )}
          <div>
            <h3>Payment Method</h3>
            <label>
              <input type="radio" value="credit" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Credit/Debit Card
            </label>
            <label>
              <input type="radio" value="apple" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Apple Pay
            </label>
            <label>
              <input type="radio" value="google" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Google Pay
            </label>
            <label>
              <input type="radio" value="paypal" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Paypal
            </label>
            <label>
              <input type="radio" value="klarna" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Klarna
            </label>
            <label>
              <input type="radio" value="afterpay" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              AfterPay
            </label>
          </div>
          <div>
            <h3>Shipping Method</h3>
            <label>
              <input type="radio" value="standard" {...register('shippingMethod')} />
              Standard Shipping
            </label>
            {/* Add other shipping methods */}
          </div>
          <div>
            <h3>Order Summary</h3>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </form>
      </div>
      <div className="payment-methods">
        {renderPaymentFields()} {/* Render additional payment fields or redirect based on the selected payment method */}
      </div>
    </div>
  );
};

export default CheckoutPage;

