import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';
import './App.css'
import NavBar from './components/NavBar/NavBar';

const App = () => {
  //const { user } = useContext(UserContext);
  
  return (
    <>
      <NavBar />
        <Routes>
          <Route path='/sign-up' element={<SignUpForm/>}/>
          <Route path='/diaryEntry/new' element={<DiaryEntryForm />} />
          <Route path='/diary-entries' element={<DiaryEntryList />} />
        </Routes>
    </>
  );
};

export default App
