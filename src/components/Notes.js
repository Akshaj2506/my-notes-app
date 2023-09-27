import React, { useEffect, useState } from 'react'
import NotesItem from './NotesItem';

export default function Notes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      await fetch("http://localhost:5000/api/notes/fetchallnotes",{
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
    <div className='container row'>{data.map((elem) => {
       return (<NotesItem key={elem._id} tag={elem.tag} title={elem.title} description={elem.description} />)
    })}</div>
  )
}
