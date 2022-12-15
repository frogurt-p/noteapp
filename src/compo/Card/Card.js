import React from 'react'
import styles from "./Card.module.css"
import Assignment from './Assignment/Assignment'
import Task from './Task/Task'
import { db } from '../../firebase-connection'
import {collection, doc ,addDoc, serverTimestamp, deleteDoc, updateDoc } from 'firebase/firestore';
import AssignmentAdd from './AssignmentAdd/AssignmentAdd'
import editTitle from '../../resource/Edit.svg'

const Card = (props) => {
  const inputVal = React.useRef();
  const inputTitleVal = React.useRef();
  const [titleEditState, setTitleEditState] = React.useState(false);
  const [title, setTitle] = React.useState();

  React.useEffect(()=> {
  setTitle(props.title)
  },[props.title])

  const handleEditTitle = async () => {
    await setTitleEditState(true)
    inputTitleVal.current.focus()
  }

  const handleUpdateTitle = async (e) => {
    if(e.key === "Enter" && title !== "") {
      const docLocation = doc(db, "card", props.id)
      
      updateDoc(docLocation,{
        title: title
      }).then((res)=>{
        setTitleEditState(false)
      })
      
    }
  }

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

  const handleDeleteAssignment = async (index) => {
    const newArr = [...props.assigned]
    newArr.splice(index, 1)
    const docLocation = doc(db, "card", props.id)
    await updateDoc(docLocation,
      {
        assigned : newArr,
      })


  }

  return (
    <div className={styles.card}>
        <div className={styles.cardBlock}/>
        <div className={styles.cardHeader}>

             <div className={styles.cardHeaderAvatar} onClick={handleEditTitle}>
              <p className={styles.avatarInitial}>{props.title.substring(0,1)}</p>
              <img className={styles.editTitle} src={editTitle} alt={editTitle}/>
              </div>

             <div className={styles.editContainer}>
             { !titleEditState && <h2 className={styles.cardHeaderTitle}>{props.title}</h2>}
             { titleEditState && <input className={styles.inputTitle} 
             placeholder="New Title..." 
             value={title} 
             onChange={(e)=>setTitle(e.target.value)} 
             onKeyUp={handleUpdateTitle} 
             ref={inputTitleVal}/>} 
             { titleEditState && <p className={styles.editNotice}>Editing. Press Enter to apply</p>}
             </div>

        </div>

        <hr className={styles.cardDivider}/>

        <div className={styles.assignedWrapper}>
        <p>assigned to</p>

          <div className={styles.labelWrapper}>
          {props.assigned.map((inst, index)=> {
            return <Assignment name={inst} key={index} index={index} handleDeleteAssignment={handleDeleteAssignment}/>
          })}
          <AssignmentAdd assigned={props.assigned} cardId = {props.id}/>
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