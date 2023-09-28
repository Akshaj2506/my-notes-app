import React, { useEffect, useState } from 'react'
import NotesItem from './NotesItem';

export default function Notes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      await fetch("http://localhost:5000/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "auth-token": (sessionStorage.getItem("auth-token") ? sessionStorage.getItem("auth-token") : ""),
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => setData(data.notes))
    }
    fetchNotes();
  }, [])
  return (
    <div className="container my-3">
      <h2>Hello [user]</h2>
      <button className="btn btn-success"><i className="fa-solid fa-plus"></i></button>
      <div className='row mb-3'>
        {data.map((elem) => {
          return (<NotesItem key={elem._id} tag={elem.tag} title={elem.title} description={elem.description} />)
        })}</div>
    </div>
  )
}
