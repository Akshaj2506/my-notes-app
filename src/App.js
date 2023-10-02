import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Auth from './components/Auth';
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Auth/>} />
          <Route exact path="/signup" element={<Auth/>} />
        </Routes>
      </Router>
    </NoteState>
  )
}