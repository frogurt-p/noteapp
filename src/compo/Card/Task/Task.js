import React from 'react'
import styles from './Task.module.css';
import { db } from '../../../firebase-connection';
import {collection, getDocs, getDoc, setDoc, doc, updateDoc } from 'firebase/firestore';


const Task = (props) => {
  const [checkState, setCheckState] = React.useState(false)
  // setCheckState(props.status)
  React.useEffect(()=>{
    setCheckState(props.status)
  },[props.status])

  const handleCheck =  () => {
    // setCheckState(prevState => !prevState)
    const docLocation = doc(db, "card", props.parentId, "task", props.id)
    const res = getDoc(docLocation).then((doc)=>{
      // setDoc(docLocation,{
      //   status : !props.status
      // })
      updateDoc(docLocation, {
        status : !props.status
      })
    });
    // console.log(res)

  }

  return (
    <div className={styles.task}>
        <input className={styles.checkbox} type="checkbox" checked={checkState} onChange={handleCheck}/>
        <p>{props.taskName}</p>
    </div>
  )
}

export default Task