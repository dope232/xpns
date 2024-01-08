import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const CurrencyConverter = () => {
  const [usdAmount, setUsdAmount] = useState(0);
  const exchangeRate = 83.29;

  const convertToInr = () => {
    const inrAmount = usdAmount * exchangeRate;
    return inrAmount.toFixed(2); 
  };

  return (
    <div className='mt-16'>
      <Typography variant="h5" gutterBottom color="primary">
        Currency Converter
      </Typography>
      <TextField
        label="Enter USD amount"
        type="number"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
            style: {
              color: 'white', 
            },
          }}
        
        InputProps={{
            style: {
              color: 'white', 
            },
            placeholder: 'Enter amount',
            style: {
              color: 'white', 
            },
          }}
      />
      <Typography color="primary">
        {usdAmount === 0
          ? 'Please enter a valid USD amount.'
          : `Equivalent amount in INR: ${convertToInr()} INR`}
      </Typography>
    </div>
  );
};

export default CurrencyConverter;
