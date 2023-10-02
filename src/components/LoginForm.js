import React, { useContext } from 'react'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

export default function LoginForm() {
   let navigate = useNavigate()
   const {showAlert} = useContext(NoteContext);
   const login = async () => {
      const enteredEmail = document.getElementById('email-input').value;
      const enteredPassword = document.getElementById('password-input').value;
      await fetch('http://localhost:5000/api/auth/login', {
         method: 'POST',
         body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword
         }),
         headers: {
            "Content-Type": "application/json"
         }
      })
         .then((res) => res.json())
         .then(async(data) => {
            if (data.success) {
               sessionStorage.setItem("auth-token", data.authToken)
               await fetch("http://localhost:5000/api/auth/getuser", {
                  method: "POST",
                  headers: {
                     "auth-token": (sessionStorage.getItem("auth-token") ? sessionStorage.getItem("auth-token") : ""),
                     "Content-Type": "application/json"
                  }
               })
                  .then((res) => res.json())
                  .then(data => sessionStorage.setItem("userInfo", JSON.stringify(data)))
                  .then(navigate("/"))
                  .then(showAlert("success", "You have been successfully logged in"))
            } else {
               showAlert("danger", "Incorrect credentials")
            }
         })
   }
   return (
      <div>
         <div className="container">
            <h3>Login</h3>
            <form action="http://localhost:5000/api/auth/login" method='post'>
               <div className="row-md-4">
                  <label htmlFor="validationDefault01" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email-input" placeholder='E-mail' required />
               </div>
               <div className="row-md-4 my-3">
                  <label htmlFor="validationDefault01" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password-input" placeholder='Password' required />
               </div>
               <div className="col-15">
                  <button className="btn btn-primary" type="button" onClick={login}>Login</button>
               </div>
            </form>
         </div>
      </div>
   )
}
