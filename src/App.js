import React, { useState } from 'react';
import './App.css';

function App() { // отображение 
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');  //notes хранит список заметок, а newNoteText хранит текст новой заметки.

  function addNote() {
    if (newNoteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: newNoteText     //  checkbox
      };
      setNotes([...notes, newNote]); // обновление заметок 
      setNewNoteText('');           // обновление текста заметок 
    }
  }

  function deleteNote(id) {
    const isConfirmed = window.confirm("Are you want to delete this note?");
    if (isConfirmed) {
      setNotes(
        notes.filter(
          function (note) {
            return note.id !== id;
          }
        )
      );
    }
  }

  function toggleNoteCompletion(id) {
    setNotes(
      notes.map(
        function (note) {
          if (note.id === id) {
            return {
              id: note.id,
              text: note.text
            };
          }
          else {
            return note;
          }
        })
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Notebook</h1>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={function (e) { // фунция обработчик 
              e.preventDefault();
              addNote();
            }}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter your note" value={newNoteText} //переменнная 
                  onChange={function (e) { setNewNoteText(e.target.value); }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
          </div>
        </div>
        <br />
        
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>My Notes</h2>
          </div>
        </div>

        <div className="row">
          <div className="notes col-md-8 offset-md-2">
            <ul className="list-group-item">
              {notes.map(
                function (note) {
                  return (
                    <li className="list-group-item">
                      <div className="checkdiv">
                        <div className="checkbox-container">
                          <input
                            type="checkbox"
                            onChange={function () { toggleNoteCompletion(note.id); }}
                          />
                          <span>{note.text}</span>
                        </div>
                        <button className="btn btn-danger" onClick={function () { deleteNote(note.id); }}>Delete</button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
