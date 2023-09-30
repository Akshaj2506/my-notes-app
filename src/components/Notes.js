import React, { useContext, useEffect} from 'react'
import NotesItem from './NotesItem';
import NoteContext from '../context/notes/noteContext';

export default function Notes() {
  const {data, fetchNotes} = useContext(NoteContext);
  useEffect(() => {
    const getNotes = async () => {
      await fetchNotes()
    }
    getNotes();
    //eslint-disable-next-line
  }, [])
  return (
    <div className="container my-3">
      <h2>Hello [user]</h2>
      <button className="btn btn-success">Add <i className="fa-solid fa-plus"></i></button>
      <div className='row mb-3'>
        {data.notes.map((elem) => {
          return (<NotesItem key={elem._id} noteId={elem._id} tag={elem.tag} title={elem.title} description={elem.description} />)
        })}</div>
    </div>
  )
}
