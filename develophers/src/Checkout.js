import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StripePayment from './StripePayment';

// Validation schema for the form using yup
const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email('Invalid email').required(),
  billingAddress: yup.object().shape({
    street: yup.string().required(),
    suite: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
  }),
  shippingAddress: yup.object().shape({
    street: yup.string().required(),
    suite: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
  }),
  sameAsBilling: yup.boolean(),
  paymentMethod: yup.string().required(),
  shippingMethod: yup.string().required(),
});

const CheckoutPage = ({ cart }) => {
  const navigate = useNavigate();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  // Initialize form handling with react-hook-form and yup
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sameAsBilling: true,
    },
  });

  // Watch for changes in sameAsBilling and shippingMethod fields
  const watchSameAsBilling = watch("sameAsBilling");
  const selectedShippingMethod = watch("shippingMethod");

  // Calculate order totals whenever cart or shipping cost changes
  useEffect(() => {
    const calculateTotals = () => {
      const subtotalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const taxValue = subtotalValue * 0.10;
      const totalValue = subtotalValue + taxValue + shippingCost;
      setSubtotal(subtotalValue);
      setTax(taxValue);
      setTotal(totalValue);
    };

    calculateTotals();
  }, [cart, shippingCost]);

  // Handle payment method selection change
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);

    // Automatically open new tab for PayPal or AfterPay login
    if (e.target.value === 'paypal') {
      window.open('https://www.paypal.com/signin', '_blank');
    } else if (e.target.value === 'afterpay') {
      window.open('https://www.afterpay.com', '_blank');
    }
  };

  // Handle shipping method selection change
  const handleShippingMethodChange = (e) => {
    const shippingMethod = e.target.value;
    let cost = 0;
    if (shippingMethod === 'standard') {
      cost = 4.95;
    } else if (shippingMethod === 'express') {
      cost = 7.95;
    }
    setShippingCost(cost);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!selectedShippingMethod) {
      alert('Please select a shipping method.');
      return;
    }

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    // Simulate payment processing (you would replace this with actual payment logic)
    try {
      console.log('Processing payment with:', selectedPaymentMethod);

      // For demonstration, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Payment successful for:', data);
      navigate('/confirmation', { state: { orderDetails: { ...data, items: cart, total } } });
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error gracefully
    }
  };

  // Conditionally render payment fields based on selected payment method
  const renderPaymentFields = () => {
    if (selectedPaymentMethod === 'credit') {
      return <StripePayment />;
    }
    return null;
  };

  // Handle checkbox change for sameAsBilling
  const handleSameAsBillingChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsBilling(isChecked);
    setValue('sameAsBilling', isChecked);
  };

  return (
    <div className="checkout-page">
      <div className="items-summary">
        <h2>Items in Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} style={{ width: '150px', height: '150px' }} />
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
              <input type="checkbox" {...register('sameAsBilling')} checked={watchSameAsBilling} onChange={handleSameAsBillingChange} />
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
            <h3>Order Summary</h3>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
            <p>Total: ${(subtotal + tax + shippingCost).toFixed(2)}</p>
          </div>
          <div>
            <h3>Shipping Method</h3>
            <label>
              <input type="radio" value="standard" {...register('shippingMethod')} onChange={handleShippingMethodChange} />
              Standard Shipping ($4.95)
            </label>
            <label>
              <input type="radio" value="express" {...register('shippingMethod')} onChange={handleShippingMethodChange} />
              Express Shipping ($7.95)
            </label>
            <p>{errors.shippingMethod?.message}</p>
          </div>
          <div>
            <h3>Payment Method</h3>
            <label>
              <input type="radio" value="credit" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              Credit/Debit Card
            </label>
            <label>
              <input type="radio" value="paypal" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              PayPal
            </label>
            <label>
              <input type="radio" value="afterpay" {...register('paymentMethod')} onChange={handlePaymentMethodChange} />
              AfterPay
            </label>
            <p>{errors.paymentMethod?.message}</p>
          </div>
          {renderPaymentFields()} {/* Render credit/debit card fields based on selected payment method */}
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
