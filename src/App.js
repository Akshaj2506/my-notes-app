import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Auth from './components/Auth';
import NoteState from './context/notes/NoteState';

export default function App() {
  return (
    <NoteState>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Auth isLogin={true} />} />
        <Route exact path="/signup" element={<Auth isLogin={false} />} />
      </Routes>
    </Router>
    </NoteState>
  )
}