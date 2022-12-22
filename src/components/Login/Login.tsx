import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {useRecoilState} from "recoil"
import "./Login.scss"
import { auth } from '../../firebase';
type Props = {}

const Login = (props: Props) => {
  const provider = new GoogleAuthProvider();
  const loginHandler = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    return
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div
    className='login_container'
    >
   <h1>To Do</h1>
   <p>Welcome to Modern Todo App</p>
   <div 
   onClick={loginHandler}
   className='login_btn'>
    <img src="https://img.icons8.com/color/512/google-logo.png" alt="" />
    Login
   </div>
    </div>
  )
}

export default Login