import React from 'react'
import styles from "./Assignment.module.css";
import removeIcon from "../../../resource/Trash.svg"

const Assignment = (props) => {
  return (
    <div className={styles.label}>
        <div className={styles.avatar} onClick={()=>props.handleDeleteAssignment(props.index)}>
          <p className={styles.initial}>{props.name.charAt(0).toUpperCase()}</p>
          <img className={styles.removeIcon} src={removeIcon} alt="remove"/>

          </div>
        <p>{props.name}</p>    
    </div>
  )
}

export default Assignment