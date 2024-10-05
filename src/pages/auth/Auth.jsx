import React from 'react'
import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import useGetUserInfo from '../../hooks/useGetUserInfo'

const Auth = () => {
    
    const Navigate = navigate()
    const navigate = useNavigate()
    const {isAuth} = useGetUserInfo()

    const GoogleSignin = async () =>{
        const results = await signInWithPopup(auth, provider);
        console.log(results)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigate("/expense-tracker")

    }

    if(isAuth) {
        return <Navigate to="/expense-tracker" />
    }

    return (
        <div>
            <p className='bg-red-500'>Sign in with google to continue</p>
            <button onClick={GoogleSignin}>
                Sign In With Google
            </button>
        </div>
    )
}

export default Auth