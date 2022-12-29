import React from 'react'
import styles from './Task.module.css';
import { db } from '../../../firebase-connection';
import {collection, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Menu from '../../../resource/Menu.svg'
import Edit from '../../../resource/EditBlack.svg'
import Trash from '../../../resource/TrashBlack.svg'


const Task = (props) => {
  const [checkState, setCheckState] = React.useState(false)
  const [dropState, setDropState] = React.useState(false);
  const [editState, setEditState] = React.useState(false);
  const [taskName, setTaskName] = React.useState('')
  const thisDiv = React.useRef();
  const inputRef = React.useRef();
  // setCheckState(props.status)
  React.useEffect(()=>{
    setCheckState(props.status)
  },[props.status])

  React.useEffect(()=>{
    setTaskName(props.taskName)
  },[props.taskName])

  React.useEffect(()=> {
      // const task = document.querySelector(`.${styles.task}`);
      // const taskHeight = window.getComputedStyle(task).getPropertyValue('height');
      // const parseHeight = parseInt(taskHeight.slice(0, -2));
      const taskHeightRef = thisDiv.current.clientHeight;
      
    if(dropState){
      if(taskHeightRef < 166) {
        // task.style.setProperty('height', `129px`)
        thisDiv.current.style.height = '129px';
      }
    } else {
      // task.style.setProperty('height','auto')
      thisDiv.current.style.height = 'auto';
    }
  
  },[dropState])

  const handleDeleteTask = () => {
    const docLocation = doc(db, "card", props.parentId, "task", props.id)
    deleteDoc(docLocation)
  }

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

  const toggleDropDown = () => {
    setDropState((prevState)=> !prevState)
  }

  const toggleEditTask = async () => {
   await setEditState(true)
    setDropState(false)
    inputRef.current.focus()
  }

  const handleUpdateTask = async (e) => {

    if(e.key === "Enter" && taskName !== ''){
      const docLocation = doc(db, "card", props.parentId, "task", props.id)
    await updateDoc(docLocation,{
      taskName : taskName
    }).then(()=>{setEditState(false)})
    }
    
  }


  const DropMenu = () => {
    return(
       <div className={styles.menuDrop}>
            <div className={styles.menuItem} onClick={toggleEditTask}><p>Edit Task</p> <img src={Edit} alt='edit'/></div> 

            <div className={styles.menuItemDelete} onClick={handleDeleteTask}>
              <p className={styles.deleteTask}>Delete Task</p> 
              <img className={styles.delete} src={Trash} alt='trash'/>
            </div>
          </div>
    )
  }

  // Use state & clamp to control extra height

  return (
    <div>
      <div className={styles.task} ref={thisDiv}>
          <input className={styles.checkbox} type="checkbox" checked={checkState} onChange={handleCheck}/>
          { !editState && <p className={ props.status ? styles.taskNameBreakthrough : null}>{props.taskName}</p>}
          { editState && <input className={styles.input} 
          placeholder='New Task...' 
          value={taskName} 
          ref={inputRef} 
          onChange={(e)=>setTaskName(e.target.value)}
          onKeyUp={handleUpdateTask}/>}


          <div className={styles.menuParent}>
          <img className={styles.menu} src={Menu} alt="menu" onClick={toggleDropDown}/>
                {dropState && <DropMenu/>}
          </div>
      </div>
      { editState && <p className={styles.editingNotice}>Editing... Press Enter to Update</p>}
    </div>
  )
}

export default Task