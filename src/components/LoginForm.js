import React from 'react'
import './LoginForm.css'

export default function LoginForm() {
   return (
      <div style={{
         width: "fit-content"
      }}>
         <div className="container">
            <form action="">
               <div className="row-md-4">
                  <label htmlFor="validationDefault01" className="form-label">User ID</label>
                  <input type="text" className="form-control" id="user-id-input" placeholder='User ID' required/>
               </div>
               <div className="row-md-4 my-3">
                  <label htmlFor="validationDefault01" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password-input" placeholder='Password' required/>
               </div>
               <div className="col-15">
                  <button className="btn btn-primary" type="submit">Login</button>
               <button className="btn btn-secondary ms-3">Do not have an account? Sign Up</button>
               </div>
            </form>
         </div>
      </div>
   )
}
