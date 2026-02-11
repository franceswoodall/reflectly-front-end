import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import DiaryEntryForm from './components/DiaryEntryForm/DiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList/DiaryEntryList';
import Community from './components/Community/Community';
import * as diaryService from './services/diaryService'

const App = () => {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
    const entriesData = await diaryService.index();
    console.log('entries data', entriesData); 
    
    setEntries(entriesData);
    };
    fetchEntries();
  }, [user]);

  const navigate = useNavigate();

  const handleAddEntry = async (isPublic, diaryFormData) => {
    const newEntry = await diaryService.create(diaryFormData);
    setEntries([newEntry, ...entries]);
    navigate(isPublic ? '/' : '/diary');
  }
  
  return (
    <>
      <NavBar />
        <Routes>
          <Route path='/' element={<DiaryEntryList entries={entries}/>}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path='/diaryEntry/new' element={<DiaryEntryForm handleAddEntry={handleAddEntry}/>} />
          <Route path='/diary' element={<DiaryEntryList entries={entries} />} />
        </Routes>
    </>
  );
};

export default App
