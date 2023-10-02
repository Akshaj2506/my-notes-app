import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

export default function SignupForm() {
   const navigate = useNavigate();
   const {showAlert} = useContext(NoteContext)
   const signup = async () => {
      const enteredName = document.getElementById('name-input').value;
      const enteredEmail = document.getElementById('email-input').value;
      const enteredPassword = document.getElementById('password-input').value;
      await fetch('http://localhost:5000/api/auth/create', {
         method: 'POST',
         body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword
         }),
         headers: {
            "Content-Type": "application/json"
         }
      })
         .then((res) => res.json())
         .then(async (data) => {
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
                  .then(showAlert("success", "Your account has been successfully created"))
            } else {
               showAlert("danger", "Incorrect credentials")
            }
         })
   }
  return (
     <div>
        <div className="container">
         <h3>Sign Up</h3>
           <form action="http://localhost:5000/api/auth/signup" method='post'>
              <div className="row-md-4">
                 <label htmlFor="validationDefault01" className="form-label">First Name</label>
                 <input type="text" className="form-control" id="name-input" name='name' placeholder='First Name' required minLength={4}/>
              </div>
              <div className="row-md-4">
                 <label htmlFor="validationDefault01" className="form-label">E-mail</label>
                 <input type="email" className="form-control" id="email-input" name='email' placeholder='E-mail' required />
              </div>
              <div className="row-md-4 my-3">
                 <label htmlFor="validationDefault01" className="form-label">Password</label>
                 <input type="password" className="form-control" id="password-input" name='password' placeholder='Password' required />
              </div>
              <div className="col-15">
                 <button className="btn btn-primary" type="button" onClick={signup}>Sign Up</button>
              </div>
           </form>
        </div>
     </div>
  )
}
