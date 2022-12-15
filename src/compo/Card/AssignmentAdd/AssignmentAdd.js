import React from 'react'
import styles from "./AssignmentAdd.module.css";
import addIcon from "../../../resource/Union.svg"
import { db } from '../../../firebase-connection';
import { doc, updateDoc } from 'firebase/firestore';

const AssignmentAdd = (props) => {
  const [editState, setEditState] = React.useState(false);
  const inputVal = React.useRef();
  const handleOnClick = async () => {
    await setEditState((prevState) => !editState)
    if(inputVal.current) inputVal.current.focus();
    // console.log(inputVal.current.focus())
  }

  const handleInput = async (e) => {
    if(e.key === "Enter" && inputVal.current.value !== "") {
      const newArr = props.assigned;
      newArr.push(inputVal.current.value)
      
      const docLocation = doc(db, "card", props.cardId)
      await updateDoc(docLocation, {
        assigned : newArr
      }).then((res)=>{
        setEditState(false);
      })
      
    }
  }


  return (
    <div className={styles.label}>
        {/* <div className={styles.avatar}>+</div> */}
        <img src={addIcon} alt='log' className = {editState ? styles.avatarRotate : styles.avatar} onClick={handleOnClick}/>
        { editState ? <input className={styles.input} ref={inputVal} onKeyUp={handleInput}></input> : <p>Add</p>}    
    </div>
  )
}

export default AssignmentAdd