import styles from './DiaryEntryForm.module.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import DiaryEntryList from '../DiaryEntryList/DiaryEntryList';
import { UserContext } from '../../contexts/UserContext';

import * as diaryService from '../../services/diaryService';

const DiaryEntryForm = (props) => {
  const { entryId } = useParams();
  console.log( entryId)
  const [formData, setFormData] = useState({
      title: "", 
      reflection: "", 
      isEntryPublic: false, 
      isEntryUsernamePublic: false, 
      mood: "happy", 
      moodLvl: 5
  }); 

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target; 
    setFormData({ ...formData, [name]: type === "checkbox" ? checked: value 
    });  
  }; 

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData) 
    if (entryId) {
      props.handleUpdateEntry(entryId, formData);
    } else {
      props.handleAddEntry(formData.isEntryPublic, formData);
    }
    setFormData({
      title: "", 
      reflection: "", 
      isEntryPublic: false, 
      isEntryUsernamePublic: false, 
      mood: "happy", 
      moodLvl: 5
    })
  };

  useEffect(() => {
    const fetchEntry = async () => {
      const entryData = await diaryService.show(entryId);
      setFormData(entryData.diaryEntry);
    };
    if (entryId) fetchEntry();

    return () => setFormData({
      title: "", 
      reflection: "", 
      isEntryPublic: false, 
      isEntryUsernamePublic: false, 
      mood: "happy", 
      moodLvl: 5
    });
  }, [entryId]);

 return (
    <main className={styles.DiaryEntryForm}>
      <form onSubmit={handleSubmit} className={styles.submitForm}>
        <h1 className={styles.formTitle}>{entryId ? 'Edit Entry' :' New Diary Entry' }</h1>

      <div className={styles.input}>
        <label htmlFor="title-input" className={styles.label}>Title</label>
        <input
          className={styles.textInput}
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.input}>
        <label htmlFor="reflection-input" className={styles.label}>Reflections</label> 
        <textarea
        className={styles.textArea}
          type="text"
          name="reflection"
          id="reflection-input"
          value={formData.reflection}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
        <label htmlFor="mood" className={styles.label}>What is your current mood?</label>
        <select
          className={styles.selectInput}
          required
          name="mood"
          id="mood-input"
          value={formData.mood}
          onChange={handleChange}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="bored">Bored</option>
          <option value="afraid">Afraid</option>
          <option value="excited">Excited</option>
          <option value="angry">Angry</option>
          <option value="surprised">Surprised</option>
          <option value="calm">Calm</option>
        </select>
      </div>

      <div className={styles.input}>
        <label htmlFor="moodLvl" className={styles.label}>Current Mood Level</label>
        <input 
            className={styles.numberInput}
            type="number"
            name="moodLvl"
            id="moodLvl"
            min="1"
            max="10"
            value = {formData.moodLvl} 
            onChange={handleChange} 
        />
        </div>
      </div>

        <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
                <input 
                type="checkbox" 
                name="isEntryPublic" 
                checked={formData.isEntryPublic}
                onChange={handleChange}
                />
                Make entry public? 
            </label>  
        </div>

        <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
                <input 
                type="checkbox" 
                name="isEntryUsernamePublic" 
                checked={formData.isEntryUsernamePublic}
                onChange={handleChange}
                />
                Display username publicly? 
            </label>  
        </div>

        <button type="submit" className={styles.submitBtn}>Create Entry</button>
    
      </form>
      
    </main>
  );
};

export default DiaryEntryForm; 
