import React from 'react'
import styles from './Task.module.css';

const Task = () => {
  return (
    <div className={styles.task}>
        <input type="checkbox"/>
        <p>Task</p>
    </div>
  )
}

export default Task