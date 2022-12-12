import React from 'react'
import styles from './AddCard.module.css'

const AddCard = ({addData}) => {
  return (
    <div className={styles.addCard} onClick={addData}>
        <h1>+</h1>
        <h2>Add Card</h2>
    </div>
  )
}

export default AddCard