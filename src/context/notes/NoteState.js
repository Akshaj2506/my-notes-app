import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const [data, setData] = useState({notes : []});
   // const [loggedIn, setLoggedIn] = useState(false);
   // if (!(sessionStorage.getItem("auth-token"))) {
   //    setLoggedIn(false);
   // } else {
   //    setLoggedIn(true);
   // }
   const addNote = async (title, description, tag) => {
      await fetch("http://localhost:5000/api/notes/createnote",{
         method : "POST",
         body : JSON.stringify({
            title : title,
            description : description,
            tag: tag
         }),
         headers : {
            "Content-Type": "application/json",
            "auth-token": (sessionStorage.getItem("auth-token") ? sessionStorage.getItem("auth-token") : "")
         }
      })
   }
   const fetchNotes = async () => {
      await fetch("http://localhost:5000/api/notes/fetchallnotes", {
         method: "GET",
         headers: {
            "auth-token": (sessionStorage.getItem("auth-token") ? sessionStorage.getItem("auth-token") : ""),
            "Content-Type": "application/json"
         }
      }).then(res => res.json())
      .then((data) => setData({notes: data.notes}))
   }
   return (
      <NoteContext.Provider value={{data, setData, addNote, fetchNotes}}>
         {props.children}
      </NoteContext.Provider>
   )  
}

export default NoteState;