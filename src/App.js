import logo from './logo.svg';
import styles from './App.module.css';
import Navbar from './compo/Navbar/Navbar';
import Card from './compo/Card/Card';


function App() {
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
