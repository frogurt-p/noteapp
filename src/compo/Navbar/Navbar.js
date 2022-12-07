import React from 'react'
import styles from "./Navbar.module.css"
import { auth } from '../../firebase-connection'

const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
        <h2>Notes app</h2>

        { props.user ? <div className={styles.signOut} onClick={() => auth.signOut()}>Sign Out</div> : null}
    </div>
  )
}

export default Navbar