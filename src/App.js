import logo from './logo.svg';
import styles from './App.module.css';
import Navbar from './compo/Navbar/Navbar';
import Card from './compo/Card/Card';
import { db } from './firebase-connection';
import {collection, getDocs} from 'firebase/firestore';
import React from 'react';

function App() {
  const [data, setData] = React.useState({});
  const fireData = collection(db, "user")
  React.useEffect(()=> {
    const fetchData = async () => {
      const returnDocs = await getDocs(fireData)
      console.log(returnDocs)
    }

    fetchData();
  },[])

  return (
    <div className={styles.App}>
      <Navbar/>
        <div className={styles.cardContainer}>
        <Card/>

        </div>
    </div>
  );
}

export default App;
