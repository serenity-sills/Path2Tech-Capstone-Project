import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Checkout.css';

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sameAsBilling: true,
    },
  });

  const watchSameAsBilling = watch("sameAsBilling");
  const selectedShippingMethod = watch("shippingMethod");
  const selectedPaymentMethod = watch("paymentMethod");

  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.10;
    const shippingCost = selectedShippingMethod === 'standard' ? 4.95 : selectedShippingMethod === 'express' ? 7.95 : 0;
    const total = subtotal + tax + shippingCost;

    setValue('shippingCost', shippingCost);
    setValue('subtotal', subtotal);
    setValue('tax', tax);
    setValue('total', total);
  }, [cart, selectedShippingMethod, setValue]);

  const handlePaymentMethodChange = (e) => {
    setValue('paymentMethod', e.target.value);
  };

  const handlePayPal = () => {
    window.location.href = 'https://www.paypal.com/signin';
  };

  const handleAfterPay = () => {
    window.location.href = 'https://www.afterpay.com/checkout';
  };

  const onSubmit = async (data) => {
    if (!data.shippingMethod) {
      alert('Please select a shipping method.');
      return;
    }

    if (selectedPaymentMethod === 'credit') {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/confirmation', { state: { orderDetails: { ...data, items: cart, total: data.total } } });
      } catch (error) {
        console.error('Payment error:', error);
      }
    } else if (selectedPaymentMethod === 'paypal') {
      handlePayPal();
    } else if (selectedPaymentMethod === 'afterpay') {
      handleAfterPay();
    }
  };

  return (
    <div className="checkout-wrapper"> {/* Wrapper for the checkout page */}
      <div className="checkout-page">
        <div className="items-summary-container">
          <div className="items-summary">
            <h2>Order Summary</h2>
            <ul className="items-list">
              {cart.map(item => (
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
              <p>Subtotal: ${watch('subtotal')?.toFixed(2)}</p>
              <p>Tax: ${watch('tax')?.toFixed(2)}</p>
              <p>Shipping: ${watch('shippingCost')?.toFixed(2)}</p>
              <p>Total: ${watch('total')?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="form-section">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Checkout</h2>
              <div>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" {...register('fullName')} />
                <p className="error-message">{errors.fullName?.message}</p>
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="example@example.com" {...register('email')} />
                <p className="error-message">{errors.email?.message}</p>
              </div>
              <div>
                <h3>Billing Address</h3>
                <label>Street Address</label>
                <input type="text" placeholder="123 Main St" {...register('billingAddress.street')} />
                <p className="error-message">{errors.billingAddress?.street?.message}</p>
                <label>Suite/Apartment (optional)</label>
                <input type="text" placeholder="Apt 4B" {...register('billingAddress.suite')} />
                <label>City</label>
                <input type="text" placeholder="City" {...register('billingAddress.city')} />
                <p className="error-message">{errors.billingAddress?.city?.message}</p>
                <label>State</label>
                <input type="text" placeholder="State" {...register('billingAddress.state')} />
                <p className="error-message">{errors.billingAddress?.state?.message}</p>
                <label>Zip Code</label>
                <input type="text" placeholder="12345" {...register('billingAddress.zip')} />
                <p className="error-message">{errors.billingAddress?.zip?.message}</p>
              </div>
              <div>
                <h3>Shipping Address</h3>
                <label>
                  <input type="checkbox" {...register('sameAsBilling')} />
                  Same as billing address
                </label>
                {!watchSameAsBilling && (
                  <>
                    <label>Street Address</label>
                    <input type="text" placeholder="123 Main St" {...register('shippingAddress.street')} />
                    <p className="error-message">{errors.shippingAddress?.street?.message}</p>
                    <label>Suite/Apartment (optional)</label>
                    <input type="text" placeholder="Apt 4B" {...register('shippingAddress.suite')} />
                    <label>City</label>
                    <input type="text" placeholder="City" {...register('shippingAddress.city')} />
                    <p className="error-message">{errors.shippingAddress?.city?.message}</p>
                    <label>State</label>
                    <input type="text" placeholder="State" {...register('shippingAddress.state')} />
                    <p className="error-message">{errors.shippingAddress?.state?.message}</p>
                    <label>Zip Code</label>
                    <input type="text" placeholder="12345" {...register('shippingAddress.zip')} />
                    <p className="error-message">{errors.shippingAddress?.zip?.message}</p>
                  </>
                )}
              </div>
              <div>
                <label>Shipping Method</label>
                <select {...register('shippingMethod')}>
                  <option value="">Select Shipping Method</option>
                  <option value="standard">Standard Shipping - $4.95</option>
                  <option value="express">Express Shipping - $7.95</option>
                </select>
                <p className="error-message">{errors.shippingMethod?.message}</p>
              </div>
              <div>
                <label>Payment Method</label>
                <select {...register('paymentMethod')} onChange={handlePaymentMethodChange}>
                  <option value="">Select Payment Method</option>
                  <option value="credit">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="afterpay">AfterPay</option>
                </select>
                <p className="error-message">{errors.paymentMethod?.message}</p>
              </div>
              <button type="submit">Place Order</button>
            </form>
            <div className="payment-methods">
              {selectedPaymentMethod === 'paypal' && (
                <div>
                  <button onClick={handlePayPal}>Pay with PayPal</button>
                </div>
              )}
              {selectedPaymentMethod === 'afterpay' && (
                <div>
                  <button onClick={handleAfterPay}>Pay with AfterPay</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
