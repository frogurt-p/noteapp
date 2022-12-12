import React from 'react'
import styles from "./Card.module.css"
import Assignment from './Assignment/Assignment'
import Task from './Task/Task'
import { db } from '../../firebase-connection'
import {collection, doc ,addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import AssignmentAdd from './AssignmentAdd/AssignmentAdd'

const Card = (props) => {
  const inputVal = React.useRef();

  const HandleKeyPress = async (e) => {
    if(e.key === "Enter" && inputVal.current.value !== "") {
      const cardCollection = collection(db, "card", props.id, "task")
      const task = inputVal.current.value;

      await addDoc(cardCollection,{
        status : false,
        taskName : task,
        dateCreated : serverTimestamp(),
      }).then((res)=>{
        e.target._valueTracker.setValue("")
      })
    }
  }

  const handleDeleteCard = async () => {
    const thisDoc = doc(db, "card", props.id)
    await deleteDoc(thisDoc)
  }

  return (
    <div className={styles.card}>
        <div className={styles.cardBlock}/>
        <div className={styles.cardHeader}>
             <div className={styles.cardHeaderAvatar}>A</div>
             <h2 className={styles.cardHeaderTitle}>{props.title}</h2>
        </div>

        <hr className={styles.cardDivider}/>

        <div className={styles.assignedWrapper}>
        <p>assigned to</p>

          <div className={styles.labelWrapper}>
          {props.assigned.map((inst, index)=> {
            return <Assignment name={inst} key={index}/>
          })}
          <AssignmentAdd/>
          </div>

        </div>

        <hr className={styles.cardDivider}/>

        <div className={styles.taskList}>
          {props.tasks.map((inst)=> {
            return <Task taskName = {inst.taskName} status={inst.status} key={inst.id} id={inst.id} parentId={props.id}/>
          })}
        </div>

        <div className={styles.addTaskContainer}>
          <input type={"text"} className={styles.textInput} placeholder={"+ Add New Task"} onKeyUp={HandleKeyPress} ref={inputVal}></input>
        </div>

         {/* <hr className={styles.cardDivider}/> */}

         <div className={styles.deleteButtonContainer} onClick={handleDeleteCard}>
            <div className={styles.deleteButton}>
              <h3>Delete Card</h3>
            </div>
         </div>
    </div>
  )
}

export default Card