import React from 'react'

export default function SignupForm() {
   const signup = () => {

   }
  return (
     <div>
        <div className="container">
         <h3>Sign Up</h3>
           <form action="http://localhost:5000/api/auth/signup" method='post'>
              <div className="row-md-4">
                 <label htmlFor="validationDefault01" className="form-label">First Name</label>
                 <input type="text" className="form-control" id="name-input" name='name' placeholder='First Name' required />
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
