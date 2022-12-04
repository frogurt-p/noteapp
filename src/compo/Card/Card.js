import React from 'react'
import styles from "./Card.module.css"
import Assignment from './Assignment/Assignment'
import Task from './Task/Task'

const Card = () => {
  return (
    <div className={styles.card}>
        <div className={styles.cardBlock}/>
        <div className={styles.cardHeader}>
             <div className={styles.cardHeaderAvatar}>A</div>
             <h2 className={styles.cardHeaderTitle}>Example Notes   </h2>
        </div>

        <hr className={styles.cardDivider}/>

        <div className={styles.assignedWrapper}>
        <p>assigned to</p>

          <div className={styles.labelWrapper}>
          <Assignment/>
          </div>

        </div>

        <hr className={styles.cardDivider}/>

        <div className={styles.taskList}>
          <Task/>
        </div>

    </div>
  )
}

export default Card