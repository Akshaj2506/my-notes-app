import React from 'react'

export default function Alert(props) {
   const {type, message} = props
   return (
      <div className={`alert alert-${type}`} role="alert">
         {message}
      </div>
   )
}
