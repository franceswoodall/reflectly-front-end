import './DiaryEntryList.css'; 

const DiaryEntryList = (props) => {
    const entries = props.entries || [

    ]

    return (
        <main>
            <h1>My Diary Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry._id}>
                        {entry.title} {entry.reflection}
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default DiaryEntryList;