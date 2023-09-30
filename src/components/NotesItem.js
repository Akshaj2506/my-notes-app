import { useContext } from "react"
import NoteContext from "../context/notes/noteContext"

export default function NotesItem(props) {
   const {deleteNote, fetchNotes} = useContext(NoteContext);

   const removeNote = async () => {
      await deleteNote(props.noteId)
      await fetchNotes();
   }

   return (
      <div className="col-md-4">
         <div className="card my-3">
            <div className="card-body">
               <h5 className="card-title">{props.title}</h5>
               <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
               <p className="card-text">{props.description}</p>
               <button className="btn btn-warning me-2"><i className="fa-solid fa-pencil"></i></button>
               <button className="btn btn-danger" onClick={async () => await removeNote()}><i className="fa-solid fa-trash"></i></button>
            </div>
         </div>
      </div>
   )
}
