import { useState } from 'react';

// Destructure props 
const CommentsForm = ({ diaryEntryId, handleAddComment }) => {
    
    const [formData, setFormData] = useState({ comment: '' }); 

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value }); 
    }; 

    const handleSubmit = (evt) => {
        evt.preventDefault(); 
        
       
        const commentData = {
            comment: formData.comment, 
        }; 
console.log(diaryEntryId)
        handleAddComment(commentData); 

       
        setFormData({ comment: '' });
    }; 

    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment-input">Your Comment: </label>
            <textarea
                required
                name="comment" 
                id="comment-input"
                value={formData.comment}
                onChange={handleChange}
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
}; 

export default CommentsForm;