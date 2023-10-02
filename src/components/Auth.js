import React from 'react'
import LoginForm from './LoginForm'
import { useLocation } from 'react-router-dom'
import SignupForm from './SignupForm';


export default function Auth() {
   const loc = useLocation();
   return (
      <>
         <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
         }}>
            {(loc.pathname === "/login") && <LoginForm />}
            {(loc.pathname === "/signup") && <SignupForm />}
         </main>
      </>
   )
}
