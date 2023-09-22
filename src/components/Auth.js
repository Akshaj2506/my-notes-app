import React from 'react'
import LoginForm from './LoginForm'


export default function Auth() {
   return (
      <>
         <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
         }}>
            <LoginForm />
         </main>
      </>
   )
}
