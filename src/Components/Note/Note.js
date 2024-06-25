import { React, useState } from "react";
import deleteIcon from "../../assets/delete.svg";
import "./Note.css";
import axios from 'axios';

function Note({ note, deleteNote, updateText }) {

  const [text, setText] = useState('')
  const [message, setMessage] = useState('');

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan", "Feb", "March", "April", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12; // Adjust for 12-hour clock

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newNote = {
        text: text,
        time: new Date(), // Set time to current time
        color: note.color // Assuming note.color is already defined in your Note component
      };
  
      const response = await axios.post('http://localhost:5000/notes', newNote);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error creating note:', error);
      setMessage('Server error');
    }
  };
  

  const handleChange = (event) => {
    updateText(event.target.value, note.id)
    
    setText(event.target.value);
    console.log(event.target.value);
    
  }

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <textarea
        className="note_text"
        defaultValue={note.text}
        onChange={handleChange}
      />
      <div className="note_footer">
        <p>{formatDate(note.time)}</p>
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => deleteNote(note.id)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Save</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Note;
