import React, { useContext} from 'react'
import NoteContext from '../context/notes/noteContext'

export default function AddNote() {
   const {addNote, fetchNotes} = useContext(NoteContext);
   // const [note, setNote] = useState({})
   const createNote = async (e) => {
      e.preventDefault()
      const enteredTitle = document.getElementById("title").value;
      const enteredDesc = document.getElementById("description").value;
      const enteredTags = document.getElementById("tags").value;
      await addNote(enteredTitle, enteredDesc, enteredTags);
      await fetchNotes();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("tags").value = "";
   }
   return (
      <form className='container mt-3' method="post" action='http://localhost:5000/api/notes/createnote'>
         <h3>Add a note</h3>
         <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder='Title' required minLength={5}/>
         </div>
         <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text-area" className="form-control" id="description" placeholder='Description' required/>
         </div>
         <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags:</label>
            <input type="text" className="form-control" id="tags" placeholder='Tags' required/>
         </div>
         <button type="submit" className="btn btn-success" onSubmit={async () => await createNote()}>Add <i className="fa-solid fa-plus"></i></button>
      </form>
   )
}
