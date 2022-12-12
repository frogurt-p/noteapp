import React from 'react'
import styles from "./Assignment.module.css";

const Assignment = (props) => {
  return (
    <div className={styles.label}>
        <div className={styles.avatar}>{props.name.charAt(0).toUpperCase()}</div>
        <p>{props.name}</p>    
    </div>
  )
}

export default Assignment