import NavBar from "../NavBar/NavBar";
import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import DiaryEntryList from "../DiaryEntryList/DiaryEntryList";
import styles from './Landing.module.css'
import Logowbg from '../../assets/images/Logowbg.png';

const Landing = () => {

  const { user, setUser } = useContext(UserContext)

  const handleSignOut = () => {
    localStorage.removeItem('token')
      setUser(null)
  }

  return (
    <>
    <section className={styles.landing}>
      <img src={Logowbg} alt='Confused heads' />
      <div>
      <h1>TRACK 
          YOUR 
          CHANGE.
      </h1>
      <p>Don’t be ashamed, write about you in the diary and share yourself to others. They can help you.</p>
      { user ? (
        <ul className="styles.landing">
          <li><button onClick={ handleSignOut } className={styles.signout}>Sign Out</button></li>
        </ul>
      ) : (
        <ul>
          <li><button><Link to='/sign-in'>Sign In</Link></button></li>
          <li><button><Link to='/sign-up'>Sign Up</Link></button></li>
        </ul>
      )}
      </div>
    </section>
    <section>
    
    </section>
    </>
  );
};

export default Landing;