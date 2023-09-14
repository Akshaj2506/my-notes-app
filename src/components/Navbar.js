import React, { useState } from 'react';
import accountImg from './account.png';

export default function Navbar() {
   const [theme, setTheme] = useState("light");
   const [dark, setDark] = useState(false);
   const [themeButtonText, setThemeButtonText] = useState("Enable Dark Mode");
   document.querySelector("html").setAttribute("data-bs-theme", theme);

   const toggleTheme = () => {
      if (!dark) {
         setTheme("dark");
         setDark(true);
         setThemeButtonText("Enable Light Mode");
      } else {
         setTheme("light");
         setDark(false);
         setThemeButtonText("Enable Dark Mode");
      }
   }
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
         <div className="container-fluid">
            <a className="navbar-brand" href="/">myNotesApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item position-absolute end-0">
                     <div className="btn-group mx-3">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                           <img src={accountImg} height={20} alt="" />
                        </button>
                        <ul className="dropdown-menu" style={{minWidth: "50px"}}>
                           <li><a className="dropdown-item" href="/">Login</a></li>
                           <li><a className="dropdown-item" href="/">Logout</a></li>
                        </ul>
                     </div>
                     <button onClick={toggleTheme} className='btn btn-primary'>{themeButtonText}</button>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}
