import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Navbar from './compo/Navbar/Navbar';
import Card from './compo/Card/Card';

// import firebase from "firebase/compat/app"
import { db, auth } from './firebase-connection';
import {collection, getDocs, getDoc, setDoc, addDoc, query, where, doc, collectionGroup, serverTimestamp, orderBy} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from './compo/SignIn/SignIn';
import AddCard from './compo/AddCard/AddCard';

function App() {
  const [user] = useAuthState(auth);
  const [data, setData] = React.useState([]);
  const [render, setRender] = React.useState(false);
  const fireData = collection(db, "card")
  // const subColData = collection(db, "card", "CWLSGwGiNynYZqs62xiW", "task")
  const q = query(fireData, where("uid","==", user && user.uid), orderBy("dateCreated","asc"));
  const [realTimeChange] = useCollectionData(q);

  const taskData = collectionGroup(db, "task")
  const [realTimeSubChange] = useCollectionData(taskData)

  React.useEffect(()=> {

    const fetchData = async () => {
      const returnDocs = await getDocs(q)
      let masterDocs = returnDocs.docs.map((doc)=> ({...doc.data(), id : doc.id}))
      // console.log(masterDocs)
      for( let i = 0; i < masterDocs.length; i++){
        const subColData = collection(db, "card", masterDocs[i].id, "task");
        const subColDataQuery = query(subColData, orderBy("dateCreated", "asc"));
        const returnSubCol = await getDocs(subColDataQuery);
        let subColDocs = returnSubCol.docs.map((doc)=> ({...doc.data(), id : doc.id}))
        Object.assign(masterDocs[i], { tasks : subColDocs})
      }
      setData(masterDocs);
    }

    user && fetchData()

  },[user, realTimeChange,realTimeSubChange])

   const addData = () => {
    const colRef = collection(db, "card");
      addDoc(colRef, {
        title : "New Task",
        assigned : [user.displayName],
        uid : user.uid,
        dateCreated : serverTimestamp(),
      }).then((res)=> {
        const docId = res.id;
        const subColRef = collection(db, "card", docId, "task")
        addDoc(subColRef,{
          status : false,
          taskName : "task",
          dateCreated : serverTimestamp(),
        })
      })
      
  }

  // const displayData = () => {
  //   data && data.map((inst)=> {
  //     return <Card key={inst.id} title={inst.title} assigned={inst.assigned} tasks={inst.tasks}/>
  //   })
  // }

  const displayData = data.map((inst)=> {
    return <Card key={inst.id} title={inst.title} assigned={inst.assigned} tasks={inst.tasks} id={inst.id} dateCreated={inst.dateCreated}/>
  })

  return (
    <div className={styles.App}>
      <Navbar user={user}/>
        <div className={styles.cardContainer}>
        
        { user ? displayData : <SignIn/> }
        { user ? <AddCard addData={addData}/> : null }
        </div>
        
    </div>
  );
}

export default App;
