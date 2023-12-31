import React, { useContext, useState } from 'react';
import accountImg from './account.png';
import { Link, useLocation } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
import Alert from './Alert';

export default function Navbar() {
   const [theme, setTheme] = useState("light");
   const [dark, setDark] = useState(false);
   let { userDetails} = useContext(NoteContext);
   const {alert, checkLoggedIn} = useContext(NoteContext);
   const isLoggedIn = checkLoggedIn();
   userDetails = JSON.parse(userDetails);
   document.querySelector("html").setAttribute("data-bs-theme", theme);

   const toggleTheme = () => {
      if (!dark) {
         setTheme("dark");
         setDark(true);
      } else {
         setTheme("light");
         setDark(false);
      }
   }
   const logout = () => {
      sessionStorage.clear();
      window.location.reload();
   }
   let location = useLocation();
   return (
      <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid mx-3">
               <Link className="navbar-brand" to="/">myNotesApp</Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                     <li className="nav-item">
                        <Link className={"nav-link " + ((location.pathname === "/") ? "active" : "")} aria-current="page" to="/">Home</Link>
                     </li>
                     <li className="nav-item">
                        <Link className={"nav-link " + ((location.pathname === "/login") ? "active" : "") + " " + ((isLoggedIn) ? "disabled": "")} aria-current="page" to="/login">Login</Link>
                     </li>
                     <li className="nav-item">
                        <Link className={"nav-link " + ((location.pathname === "/signup") ? "active" : "") + " " + ((isLoggedIn) ? "disabled": "")} aria-current="page" to="/signup">Sign Up</Link>
                     </li>
                     <li className="nav-item" style={{ position: "absolute", right: 30 }}>
                        <div className="btn-group mx-3">
                           <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <img src={accountImg} height={20} alt="" /> {(userDetails) ? userDetails.name : ""}
                           </button>
                           <ul className="dropdown-menu" style={{ minWidth: "50px" }}>
                              <li><a className="dropdown-item" href="/">Login</a></li>
                              <li><a className="dropdown-item" href="/">Logout</a></li>
                           </ul>
                        </div>
                        <button onClick={toggleTheme} className='btn btn-primary'>Enable {(dark) ? 'Light' : 'Dark'} Mode</button>
                        <button onClick={logout} className={`ms-3 btn btn-primary ${(!isLoggedIn) ? "d-none" : ""}`}>Logout</button>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         {alert.status && <Alert type={alert.type} message={alert.message} />}
      </>
   )
}
