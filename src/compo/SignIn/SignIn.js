import React from 'react'
import styles from './SignIn.module.css'
import { provider, auth } from '../../firebase-connection'
import { signInWithPopup } from 'firebase/auth'

const SignIn = () => {
  const GoogleSignIn = () => {
    signInWithPopup(auth, provider).then((res)=> {
      const user = res.user
      console.log(user)
    }).catch((err)=> {
      const errorCode = err.code;
    const errorMessage = err.message;
    // The email of the user's account used.
    const email = err.customData.email;
    })
  }

  return (
    <div className={styles.signInButton} onClick={GoogleSignIn}>Sign In with Google</div>
  )
}

export default SignIn