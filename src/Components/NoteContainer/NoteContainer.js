import React from "react";
import Note from "../Note/Note";
import "./NoteContainer.css";

function NoteContainer(props) {
  return (
    <div className="note-container">
      <h2>Notes</h2>
      <div className="note-container_notes custom-scroll">
        {props.notes.length > 0 ? (
          props.notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              deleteNote={props.deleteNote} // Pass deleteNote function
              updateText={props.updateText}
            />
          ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
