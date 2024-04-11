import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth"
import { app } from '../firebase';
import {useDispatch} from "react-redux";
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {

    const dispatch=useDispatch();

    const handleGoogleClick = async()=> {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            //console.log(result);
            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log("Couldn't login with google",error);
        }
    }

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-600 mt-2 text-white p-3 rounded-lg w-full transition hover:bg-opacity-90'>Continue with Google</button>
  )
}
