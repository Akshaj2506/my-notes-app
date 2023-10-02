import { useContext } from 'react';
import '../App.css';
import AddNote from './AddNote';
import Notes from './Notes';
import NoteContext from '../context/notes/noteContext';
import Error from './Error';
function Home() {
   const {checkLoggedIn} = useContext(NoteContext);
   const isLoggedIn = checkLoggedIn();
   return (
      <>
         {!(isLoggedIn) && <Error />} 
         {isLoggedIn && <AddNote/>}
         {isLoggedIn && <Notes/>}
      </>
   );
}

export default Home;
