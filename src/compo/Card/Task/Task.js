import React from 'react'
import styles from './Task.module.css';

const Task = () => {
  const [checkState, setCheckState] = React.useState(false)

  const handleCheck = () => {
    setCheckState(prevState => !prevState)
  }

  return (
    <div className={styles.task}>
        <input className={styles.checkbox} type="checkbox" checked={checkState} onChange={handleCheck}/>
        <p>LLaunch project </p>
    </div>
  )
}

export default Task