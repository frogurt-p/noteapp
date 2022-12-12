import React from 'react'
import styles from "./AssignmentAdd.module.css";
import addIcon from "../../../resource/Union.svg"

const AssignmentAdd = (props) => {
  const [editState, setEditState] = React.useState(false);
  const handleOnClick = () => {
    setEditState((prevState) => !editState)
  }


  return (
    <div className={styles.label}>
        {/* <div className={styles.avatar}>+</div> */}
        <img src={addIcon} alt='log' className = {editState ? styles.avatarRotate : styles.avatar} onClick={handleOnClick}/>
        { editState ? <input className={styles.input}></input> : <p>Add</p>}    
    </div>
  )
}

export default AssignmentAdd