import { FormControl, TextField, Typography, FormLabel, RadioGroup, Radio,  FormControlLabel, Button, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Divider,    } from '@mui/material'
import Balance from './Balance'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import Graph from './Graph'
import { useAddTrans } from '../hooks/useAddTrans'
import { useGetTrans } from '../hooks/useGetTrans';
import {useDeleteTrans} from '../hooks/useDeleteTrans';
import { useGetUserInfo} from '../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'
import CurrencyConverter from './CurrencyConverter';






const Dashboard = () => {

  const {addTrans} = useAddTrans();
  const {deleteTrans} = useDeleteTrans(); 
  const {getTrans} = useGetTrans(); 
  
  
  const {trans, totals} = useGetTrans();
  const {name, profile} = useGetUserInfo();
  let navigate = useNavigate();

  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [type, setType] = React.useState('Expense');

  const {balance, income, expense} = totals;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrans({
      description ,
      amount,
      type,
    });

  };

  const handleType = (e) => {
    setType(e.target.value);
  }

  const handleSignout = async () => {
    try{
    await signOut(auth);
    localStorage.clear(); 
    navigate('/'); 
    
    }
    catch(err){
      console.log(err)
    }

  }

  const handleDelete = (trans) => {
    deleteTrans(
      {
        description: trans.description,
        amount: trans.amount,
        type: trans.type,
      },
      () => {
        // This callback will be called after the transaction is deleted
        // You can put your logic to re-fetch transactions or update the UI here
        getTrans();
      }
    );
  };
  





  return (
    <>
    
    <div className="min-h-screen flex flex-col bg-#efa5ed">
    <div className='container mx-auto p-4  '>
      <header>
    <div className='flex justify-between flex-row '>
      <div className='flex justify-evenly flex-row' >
     <Avatar alt={name} src={profile} sx={{ width: 56, height: 56, marginBottom: 1} } />
     <Typography component="h2" variant="h6" color="primary" gutterBottom sx = {{margin: 2, marginTop: 1}}>
        {name}
      </Typography>
      </div>
      <div className='m-3 ml-1 justify-center flex'>

<Typography component="h1" variant="h6" color="primary" gutterBottom>
  {/* <img src  = "./images/logo.png" alt="logo" className='h-13 w-13'  /> */}
  XPNS Tracker
  
</Typography>
</div>
      
      <Button variant='contained' color='secondary' onClick={handleSignout} sx={{ height: 40}} startIcon = {<LogoutIcon/>}>Logout</Button>
    </div>
    </header>
    <Divider className='my-4' style={{ backgroundColor: 'white' }} />

   <div className='mt-5 flex justify-between flex-row '>

      
   
   
    <div className=''>
      <div className='  '>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Income:
        </Typography>
        <Typography component="h2" variant="h6" color="secondary" gutterBottom style={{
    fontSize: '3rem',fontWeight: 'bold',textShadow: '2px 2px 2px rgba(171, 71, 188, 0.5)',color: 'primary'}}>
        ₹{income}
        </Typography>

        </div>
      <div className=''>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Expense:
        </Typography>
        <Typography component="h2" variant="h6" color="secondary" style={{
    fontSize: '3rem',fontWeight: 'bold',textShadow: '2px 2px 2px rgba(171, 71, 188, 0.5)',color: 'primary'}} gutterBottom>
        ₹{expense}
        </Typography>
        <Graph income={income} expense={expense} />

        </div>


    </div>

    <div className='ml-0'>
      
      <Balance/>
      
      <CurrencyConverter/>
      

    </div>




    <div className='border border-solid border-gray-300 p-4 flex flex-row' >
   
    
    <form onSubmit={handleSubmit} >
    <FormControl>
    <TextField
  id="outlined-multiline-flexible"
  className='description'
  label="Description"
  placeholder='Enter description of transaction'  
  multiline
  maxRows={4}
  required 
  onChange={(e) => setDescription(e.target.value)}
  InputLabelProps={{
    style: {
      color: 'white', 
    },
  }}
  InputProps={{
    style: {
      color: 'white', 
    },
    placeholder: 'Enter description of transaction',
    style: {
      color: 'white', 
    },
  }}
/>



<TextField
  id="outlined-number"
  label="Amount"
  type="number"
  required
  placeholder='Enter amount'
  InputLabelProps={{
    style: {
      color: 'white', 
    },
    shrink: true,
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
  onChange={(e) => setAmount(e.target.value)}
/>


<FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'white' }}>Type</FormLabel>

<RadioGroup
  row
  aria-labelledby="demo-radio-buttons-group-label"
  defaultValue="Expense"
  name="radio-buttons-group"
  onChange={handleType}
  required
>
  <FormControlLabel value="Expense" control={<Radio />} label="Expense" sx={{ color: 'white' }} />
  <FormControlLabel value="Income" control={<Radio />} label="Income" sx={{ color: 'white' }} />
</RadioGroup>

<Button variant="contained" type='submit' startIcon={<AddIcon />} sx={{ color: 'white' }}>Add Transactions </Button>

</FormControl>
</form>
</div>
</div>


<div className='trans'>
  <Typography component="h2" variant="h6" color="secondary" gutterBottom>
    Transactions
    </Typography> 
  
  {/* <ul>
    {trans.map((trans) => {
      return ( 
        <li>
          <h2>{trans.type} </h2>
          <h3>{trans.description} </h3>
          <p> ₹{trans.amount}</p>
          
        </li>
        
        
      )
    })}
    
  </ul> */}
  <Table size='small'>
          <TableHead>
            <TableRow>
             
              <TableCell><Typography variant='head' fontWeight="bold" sx = {{color: 'white'}}>Description</Typography></TableCell>
              <TableCell><Typography variant='head' fontWeight="bold" sx = {{color: 'white'}}>Amount</Typography></TableCell>
              <TableCell><Typography variant='head' fontWeight="bold" sx = {{color: 'white'}}>Type</Typography></TableCell>
              <TableCell align="right"><Typography variant='head' fontWeight="bold" sx = {{color: 'white'}}>Delete</Typography></TableCell>

            </TableRow>

            
          </TableHead>
          <TableBody>
  {trans.map((trans) => (
    <TableRow>
      
      <TableCell><Typography variant = 'desc' sx = {{color: 'white'}}>{trans.description}</Typography></TableCell>
      <TableCell><Typography variant='amt' fontWeight="bold" sx={{color: trans.type === 'Income' ? 'green' : 'red' }}>{trans.amount} </Typography></TableCell>
      <TableCell sx={{color: trans.type === 'Income' ? 'green' : 'red' }}>{trans.type}</TableCell>
      <TableCell align="right"><Button variant='contained' onClick={() => handleDelete(trans)}  color = 'error' startIcon = {<DeleteIcon/>}></Button></TableCell>

    </TableRow>
  ))}
</TableBody>


        </Table>
</div>

</div>


      

</div>


    </>
  )
}

export default Dashboard
