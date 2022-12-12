import React from 'react'
import styles from "./AssignmentAdd.module.css";
import addIcon from "../../../resource/Union.svg"

const AssignmentAdd = (props) => {
  return (
    <div className={styles.label}>
        {/* <div className={styles.avatar}>+</div> */}
        <img src={addIcon} alt='log' className = {styles.avatar}/>
        <p>Add</p>    
    </div>
  )
}

export default AssignmentAdd