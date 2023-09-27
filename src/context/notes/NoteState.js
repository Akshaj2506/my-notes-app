import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const [data, setData] = useState([]);
   // const [loggedIn, setLoggedIn] = useState(false);
   // if (!(sessionStorage.getItem("auth-token"))) {
   //    setLoggedIn(false);
   // } else {
   //    setLoggedIn(true);
   // }
   return (
      <NoteContext.Provider value={{data, setData}}>
         {props.children}
      </NoteContext.Provider>
   )  
}

export default NoteState;