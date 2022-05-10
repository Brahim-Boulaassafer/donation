import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';




import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51K4PUGJCrjKNneBUTMEwzhSrLh4zx22xCK9jDxIVA4fPq2NIEJPYdy8OkAmmT13e7OHjgvCVVmWOYCvRwVXuUxHC0087NFTvs1');

export default function Payment({slug}) {

  return (
        <Elements stripe={stripePromise}>
          <CheckoutForm slug={slug} />
        </Elements>    
  )
}

