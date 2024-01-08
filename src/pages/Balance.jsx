import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useGetTrans } from '../hooks/useGetTrans';


function preventDefault(event) {
  event.preventDefault();
}



export default function Deposits() {
    const {totals} = useGetTrans();
    const {balance, income, expense} = totals;

  return (
    <React.Fragment>
        <div className='border border-solid border-white-300 p-4'>
      <Title>Your balance (Under/Over Budget) </Title>
      <Typography component="p" variant="h4" color= "white" style={{
    fontSize: '6rem',fontWeight: 'bold',textShadow: '2px 2px 2px rgba(255, 255, 255, 0.5)',color: 'white'}}>
      ₹{balance}
      </Typography>
      <Typography color="white" sx={{ flex: 1 }}>
        on {new Date().toDateString()}
      </Typography>
      </div>
      
    </React.Fragment>
  );
}