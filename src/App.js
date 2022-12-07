import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Navbar from './compo/Navbar/Navbar';
import Card from './compo/Card/Card';

// import firebase from "firebase/compat/app"
import { db, auth } from './firebase-connection';
import {collection, getDocs} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from './compo/SignIn/SignIn';

function App() {
  const [data, setData] = React.useState({});
  const fireData = collection(db, "user")

  React.useEffect(()=> {
    const fetchData = async () => {
      const returnDocs = await getDocs(fireData)
      // console.log(returnDocs)
    }

    fetchData();
  },[])

  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className={styles.App}>
      <Navbar/>
        <div className={styles.cardContainer}>
        
        { user ? <Card/> : <SignIn/> }
        
        </div>
    </div>
  );
}

export default App;
