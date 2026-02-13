
import { Link } from 'react-router';
import { useLocation, } from 'react-router';
import { index } from '../../services/diaryService';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './DiaryEntryList.module.css'

const DiaryEntryList = (props) => {
    const entries = props.entries;
    const location = useLocation();

    console.log(entries);

    const publicEntries = entries.filter((entry) => {
        return entry.isEntryPublic === true;
    });

    const privateEntries = entries.filter((entry) => {
        return entry.isEntryPublic === false;
    })

    return (
        <main>
            {location.pathname === "/" ? (
                <section className={styles.landinglist}>
                    <div>
                    <h1>Community Moods</h1>
                    <ul>
                        {publicEntries.map((entry) => (
                            <Link key={entry._id} to={`/diary/${entry._id}`}>
                                <li key={entry._id}> 
                                {`Mood created on: ${new Date(entry.createdAt).toLocaleDateString('en-GB', "full")}
                                 at ${new Date(entry.createdAt).toLocaleTimeString('en-GB', "full")}`} 
                                </li>
                            </Link>
                        ))}
                    </ul>
                    </div>
                </section>
            ) : (
                <section className={styles.privatelist}>
                    <div>
                    <h1>My Diary Entries</h1>
                    <ul>
                        {privateEntries.map((entry) => (
                           <Link key={entry._id} to={`/diary/${entry._id}`}>
                                <li key={entry._id}> 
                                {`My Mood on: ${new Date(entry.createdAt).toLocaleDateString('en-GB', "short")}
                                 at ${new Date(entry.createdAt).toLocaleTimeString('en-GB', "short")}: ${entry.mood}`} 
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                </section>
            )}
        </main>
    )
}

// we can display either created at / updated at timestamp 


export default DiaryEntryList;

