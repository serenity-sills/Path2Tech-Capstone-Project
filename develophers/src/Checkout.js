import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'; // Resolver for using yup with react-hook-form
import * as yup from 'yup'; // Library for schema validation
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { useForm } from 'react-hook-form'; // Hook for managing forms

// Validation schema for the form using yup
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
    street: yup.string().when('sameAsBilling', {
      is: false,
      then: yup.string().required('Street address is required for shipping'),
    }),
    suite: yup.string(),
    city: yup.string().when('sameAsBilling', {
      is: false,
      then: yup.string().required('City is required for shipping'),
    }),
    state: yup.string().when('sameAsBilling', {
      is: false,
      then: yup.string().required('State is required for shipping'),
    }),
    zip: yup.string().when('sameAsBilling', {
      is: false,
      then: yup.string().required('Zip code is required for shipping'),
    }),
  }),
  sameAsBilling: yup.boolean(),
  paymentMethod: yup.string().required('Payment method is required'),
  shippingMethod: yup.string().required('Shipping method is required'),
});

const CheckoutPage = ({ cart }) => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    register, // Hook for registering inputs
    handleSubmit, // Hook for handling form submission
    formState: { errors }, // Object to hold form errors
    watch, // Hook to watch form values
    setValue, // Hook to set form values
  } = useForm({
    resolver: yupResolver(schema), // Use yup resolver for validation
    defaultValues: {
      sameAsBilling: true, // Default value for sameAsBilling
    },
  });

  const watchSameAsBilling = watch("sameAsBilling"); // Watch the sameAsBilling field
  const selectedShippingMethod = watch("shippingMethod"); // Watch the shippingMethod field
  const selectedPaymentMethod = watch("paymentMethod"); // Watch the paymentMethod field

  // Calculate totals whenever cart or selectedShippingMethod changes
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate subtotal
    const tax = subtotal * 0.10; // Calculate tax
    const shippingCost = selectedShippingMethod === 'standard' ? 4.95 : selectedShippingMethod === 'express' ? 7.95 : 0; // Determine shipping cost
    const total = subtotal + tax + shippingCost; // Calculate total

    setValue('shippingCost', shippingCost); // Set shipping cost
    setValue('subtotal', subtotal); // Set subtotal
    setValue('tax', tax); // Set tax
    setValue('total', total); // Set total
  }, [cart, selectedShippingMethod, setValue]);

  const handlePaymentMethodChange = (e) => {
    setValue('paymentMethod', e.target.value); // Set payment method
  };

  const handlePayPal = () => {
    window.location.href = 'https://www.paypal.com/signin'; // Redirect to PayPal
  };

  const handleAfterPay = () => {
    window.location.href = 'https://www.afterpay.com/checkout'; // Redirect to AfterPay
  };

  const onSubmit = async (data) => {
    if (!data.shippingMethod) {
      alert('Please select a shipping method.'); // Alert if no shipping method is selected
      return;
    }

    if (selectedPaymentMethod === 'credit') {
      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/confirmation', { state: { orderDetails: { ...data, items: cart, total: data.total } } }); // Navigate to confirmation page with order details
      } catch (error) {
        console.error('Payment error:', error); // Log error
      }
    } else if (selectedPaymentMethod === 'paypal') {
      handlePayPal(); // Handle PayPal payment
    } else if (selectedPaymentMethod === 'afterpay') {
      handleAfterPay(); // Handle AfterPay payment
    }
  };

  return (
    <div className="checkout-page">
      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Checkout</h2>
          <div>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" {...register('fullName')} />
            <p className="error-message">{errors.fullName?.message}</p> {/* Display error message */}
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="example@example.com" {...register('email')} />
            <p className="error-message">{errors.email?.message}</p> {/* Display error message */}
          </div>
          <div>
            <h3>Billing Address</h3>
            <label>Street Address</label>
            <input type="text" placeholder="123 Main St" {...register('billingAddress.street')} />
            <p className="error-message">{errors.billingAddress?.street?.message}</p> {/* Display error message */}
            <label>Suite/Apartment (optional)</label>
            <input type="text" placeholder="Apt 4B" {...register('billingAddress.suite')} />
            <label>City</label>
            <input type="text" placeholder="City" {...register('billingAddress.city')} />
            <p className="error-message">{errors.billingAddress?.city?.message}</p> {/* Display error message */}
            <label>State</label>
            <input type="text" placeholder="State" {...register('billingAddress.state')} />
            <p className="error-message">{errors.billingAddress?.state?.message}</p> {/* Display error message */}
            <label>Zip Code</label>
            <input type="text" placeholder="12345" {...register('billingAddress.zip')} />
            <p className="error-message">{errors.billingAddress?.zip?.message}</p> {/* Display error message */}
          </div>
          <div>
            <h3>Shipping Address</h3>
            <label>
              <input type="checkbox" {...register('sameAsBilling')} /> {/* Register checkbox input */}
              Same as billing address
            </label>
            {!watchSameAsBilling && ( // Conditionally render shipping address fields
              <>
                <label>Street Address</label>
                <input type="text" placeholder="123 Main St" {...register('shippingAddress.street')} />
                <p className="error-message">{errors.shippingAddress?.street?.message}</p> {/* Display error message */}
                <label>Suite/Apartment (optional)</label>
                <input type="text" placeholder="Apt 4B" {...register('shippingAddress.suite')} />
                <label>City</label>
                <input type="text" placeholder="City" {...register('shippingAddress.city')} />
                <p className="error-message">{errors.shippingAddress?.city?.message}</p> {/* Display error message */}
                <label>State</label>
                <input type="text" placeholder="State" {...register('shippingAddress.state')} />
                <p className="error-message">{errors.shippingAddress?.state?.message}</p> {/* Display error message */}
                <label>Zip Code</label>
                <input type="text" placeholder="12345" {...register('shippingAddress.zip')} />
                <p className="error-message">{errors.shippingAddress?.zip?.message}</p> {/* Display error message */}
              </>
            )}
          </div>
          <div>
            <label>Shipping Method</label>
            <select {...register('shippingMethod')}> {/* Register select input */}
              <option value="">Select Shipping Method</option>
              <option value="standard">Standard Shipping - $4.95</option>
              <option value="express">Express Shipping - $7.95</option>
            </select>
            <p className="error-message">{errors.shippingMethod?.message}</p> {/* Display error message */}
          </div>
          <div>
            <label>Payment Method</label>
            <select {...register('paymentMethod')} onChange={handlePaymentMethodChange}> {/* Register select input with change handler */}
              <option value="">Select Payment Method</option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="afterpay">AfterPay</option>
            </select>
            <p className="error-message">{errors.paymentMethod?.message}</p> {/* Display error message */}
          </div>
          <button type="submit">Place Order</button> {/* Submit button */}
        </form>
        <div className="payment-methods">
          {selectedPaymentMethod === 'paypal' && ( // Conditionally render PayPal button
            <div>
              <button onClick={handlePayPal}>Pay with PayPal</button>
            </div>
          )}
          {selectedPaymentMethod === 'afterpay' && ( // Conditionally render AfterPay button
            <div>
              <button onClick={handleAfterPay}>Pay with AfterPay</button>
            </div>
          )}
        </div>
      </div>
      <div className="items-summary">
        <h2>Order Summary</h2>
        <ul className="items-list">
          {cart.map(item => ( // Map through cart items to display them
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
        <div>
          <h3>Order Totals</h3>
          <p>Subtotal: ${watch('subtotal')?.toFixed(2)}</p> {/* Display subtotal */}
          <p>Tax: ${watch('tax')?.toFixed(2)}</p> {/* Display tax */}
          <p>Shipping: ${watch('shippingCost')?.toFixed(2)}</p> {/* Display shipping cost */}
          <p>Total: ${watch('total')?.toFixed(2)}</p> {/* Display total */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
