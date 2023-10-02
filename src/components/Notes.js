import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesItem from './NotesItem';
import NoteContext from '../context/notes/noteContext';

export default function Notes() {
  const { data, fetchNotes, editNote } = useContext(NoteContext);
  let {userDetails} = useContext(NoteContext);
  const ref = useRef(null);
  const closeRef = useRef(null);
  userDetails = JSON.parse(userDetails);
  const [note, setNote] = useState({
    noteId: null,
    title: "",
    description: "",
    tag: "default"
  })
  useEffect(() => {
    const getNotes = async () => {
      await fetchNotes()
    }
    getNotes();
    //eslint-disable-next-line
  }, [])
  const handleOnChange = (event) => {
    setNote({
      ...note, [event.target.id]: event.target.value
    })
  }
  const openUpdateModal = () => {
    ref.current.click()
  }
  return (
    <div className="container my-3">
      <h2>Hello {(userDetails) ? userDetails.name : ""}</h2>
      <button className="btn btn-success">Add <i className="fa-solid fa-plus"></i></button>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form method="put">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" placeholder='Title' value={note.title} onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text-area" className="form-control" id="description" placeholder='Description' value={note.description} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">Tags:</label>
                  <input type="text" className="form-control" id="tag" placeholder='Tags' value={note.tag} onChange={handleOnChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => {closeRef.current.click(); editNote(note.noteId, note)}}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-3'>
        {data.notes.map((elem) => {
          return (
            <NotesItem
              key={elem._id}
              openUpdateModal={openUpdateModal}
              noteId={elem._id}
              tag={elem.tag}
              title={elem.title}
              description={elem.description}
              setNote={setNote}
            />
          )
        })}</div>
    </div>
  )
}
