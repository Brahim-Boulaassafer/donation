import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import swal from 'sweetalert';


import axiosInstance from '../../axios';

import CardSection from './CardSection';

import './css/Styles.css';

export default function CheckoutForm({slug}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token);

    }
  };

  function stripeTokenHandler(token) {

    const icon = document.querySelector('#icon');
  
    const amount=document.querySelector('#amount').value;

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = axiosInstance.post(`${slug}/charge/`, {
        stripeToken:token.id,
        amount: amount
    });

    // Return and display the result of the charge.
    swal({
      title: "Thanks!",
      text: `You Donated with $${amount}!`,
      icon: "success",
      button: "close!",
    });
    icon.click();
    return response.data;
}

  return (
     <Container component="main" maxWidth="xs" style={{
        width:'100%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
     }}>
        <CssBaseline />

    <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="amount"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          fullWidth
          autoFocus
          sx={{
            mb:1,
          }}
        />
        <CardSection />
        <Button sx={{mt:1}} type="submit" fullWidth disabled={!stripe} variant="contained">Donate</Button>
    </Box>
    </Container>
  );
}