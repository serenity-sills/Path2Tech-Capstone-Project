import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PZefARvWkD7Jgt6aimwAWUaK68byjz3krk0e0aEQYJepy3h0qu7PZcdTLBspBmqhZzsLrMBLrD0xdokJtFU3xX600aDEmELBD'); 

const StripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Here you would send paymentMethod.id to your backend for further processing
      console.log('PaymentMethod:', paymentMethod);

      // Simulate sending paymentMethod.id to your backend
      simulatePayment(paymentMethod.id);
    }
  };

  const simulatePayment = async (paymentMethodId) => {
    try {
      // Simulate sending paymentMethodId to your backend
      const response = await axios.post('/your-backend-endpoint', {
        paymentMethodId: paymentMethodId,
      });

      console.log('Backend response:', response.data);

      // Navigate to confirmation page after successful payment processing
      // Replace '/confirmation' with your actual confirmation page path
      window.location.href = '/confirmation';
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error scenarios
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const StripePaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <StripePayment />
  </Elements>
);

export default StripePaymentWrapper;
