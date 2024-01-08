import React from 'react'
import {auth, provider} from '../config/firebase-config'
import { useNavigate, Navigate } from 'react-router-dom'

import { signInWithPopup } from 'firebase/auth'

import { useGetUserInfo } from '../hooks/useGetUserInfo'
import Typography from '@mui/material/Typography';
import './auth.css'
export const Auth = () => {
  const {isAuth} = useGetUserInfo();
    let navigate = useNavigate();
    const signinwithgoogle = async () => {


        console.log('signinwithgoogle')
        const results = await signInWithPopup(auth, provider); 
        const info = {
            userID: results.user.uid, 
            name: results.user.displayName,
            email: results.user.email,
            profile: results.user.photoURL,
            isAuth: true, 
    
    
    
        }; 
        console.log(results)
        localStorage.setItem('user', JSON.stringify(info)); 
        navigate('/dashboard')
        }
        if(isAuth){
          return <Navigate to='/dashboard'/>
        }


        
    
  return (
    <div className='main-div'>
       <Typography
  variant="h1"
  style={{
    fontSize: '3rem',fontWeight: 'bold',textShadow: '2px 2px 2px rgba(255, 255, 255, 0.5)',position: 'absolute',top: '40%',left: '50%',transform: 'translate(-50%, -50%)',color: 'white'}}>
  XPNS Tracker
</Typography>
        
        <button className='login-with-google-btn' onClick={signinwithgoogle}> Sign in with Google </button>

        <div class="wave wave1"></div>
  <div class="wave wave2"></div>
  <div class="wave wave3"></div>
  <div class="wave wave4"></div>

      
    </div>
  )
}

export default Auth
