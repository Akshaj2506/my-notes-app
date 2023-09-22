import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const stateObj = {
      name : "Akshaj",
      age : 21
   }
   const [state, setState] = useState(stateObj);
   const updateState = () => {
      setTimeout(() => {
         setState({
            name: "Shubh",
            age: 18
         })
      }, 1000);
   }
   return (
      <NoteContext.Provider value={{state, updateState}}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;