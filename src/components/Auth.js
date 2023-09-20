import React from 'react'
import Alert from './Alert'
import LoginForm from './LoginForm'


export default function Auth() {
   return (
      <>
         <div className="alert position-absolute" style={{ margin: 0, padding: 0, width: "100%" }}>
            <Alert />
         </div>
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
