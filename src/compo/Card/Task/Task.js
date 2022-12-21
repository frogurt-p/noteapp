import React from 'react'
import styles from './Task.module.css';
import { db } from '../../../firebase-connection';
import {collection, getDocs, getDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import Menu from '../../../resource/Menu.svg'


const Task = (props) => {
  const [checkState, setCheckState] = React.useState(false)
  const [dropState, setDropState] = React.useState(false);
  const thisDiv = React.useRef();
  // setCheckState(props.status)
  React.useEffect(()=>{
    setCheckState(props.status)
  },[props.status])

  React.useEffect(()=> {
      // const task = document.querySelector(`.${styles.task}`);
      // const taskHeight = window.getComputedStyle(task).getPropertyValue('height');
      // const parseHeight = parseInt(taskHeight.slice(0, -2));
      const taskHeightRef = thisDiv.current.clientHeight;
      console.log(taskHeightRef)
      
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

  const DropMenu = () => {
    return(
       <div className={styles.menuDrop}>
            <p>Edit Task</p>
            <p>Delete Task</p>
          </div>
    )
  }

  // Use state & clamp to control extra height

  return (
    <div className={styles.task} ref={thisDiv}>
        <input className={styles.checkbox} type="checkbox" checked={checkState} onChange={handleCheck}/>
        <p>{props.taskName}</p>

        <div className={styles.menuParent}>
        <img className={styles.menu} src={Menu} alt="menu" onClick={toggleDropDown}/>
              {dropState && <DropMenu/>}
        </div>
    </div>
  )
}

export default Task