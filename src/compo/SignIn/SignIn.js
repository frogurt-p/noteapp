import React from 'react'
import styles from './SignIn.module.css'
import { provider, auth } from '../../firebase-connection'

const SignIn = () => {
  const GoogleSignIn = () => {
    auth.signInWithPopup(provider);
  }

  return (
    <div className={styles.signInButton} onClick={GoogleSignIn}>Sign In with Google</div>
  )
}

export default SignIn