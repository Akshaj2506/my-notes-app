import React from 'react'
import './LoginForm.css'

export default function LoginForm() {
   const login = async () => {
      const enteredEmail = document.getElementById('email-input').value;
      const enteredPassword = document.getElementById('password-input').value;
      await fetch('http://localhost:5000/api/auth/login', {
         method: 'POST',
         body : JSON.stringify({
            email: enteredEmail,
            password: enteredPassword
         })
      }).then((res) => res.json());
   }
   // useEffect(() => {
   //    login();
   // }, [])
   return (
      <div style={{
         width: "fit-content"
      }}>
         <div className="container">
            <form action="">
               <div className="row-md-4">
                  <label htmlFor="validationDefault01" className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email-input" placeholder='E-mail' required/>
               </div>
               <div className="row-md-4 my-3">
                  <label htmlFor="validationDefault01" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password-input" placeholder='Password' required/>
               </div>
               <div className="col-15">
                  <button className="btn btn-primary" type="button" onClick={login}>Login</button>
               <button className="btn btn-secondary ms-3">Do not have an account? Sign Up</button>
               </div>
            </form>
         </div>
      </div>
   )
}
