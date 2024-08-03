import React from 'react';

const EnvCheck = () => {
  console.log('Stripe Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  return <div>Check the console for the Stripe Key.</div>;
};

export default EnvCheck;
