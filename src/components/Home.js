import '../App.css';
import Menu from './Menu';
import Notes from './Notes';
import { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';

function Home() {
   const user = useContext(NoteContext);
   useEffect(() => {
      user.updateState();
      // eslint-disable-next-line
   }, [])
   return (
      <>
         <Menu />
         <Notes />
         <div>
            The name of the user is {user.state.name} and the age is {user.state.age}
         </div>
      </>
   );
}

export default Home;
