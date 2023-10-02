import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='d-flex container my-3' style={{width: "fit-content"}}>
        <div className="error-container" style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center"}}>
           <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000", fontSize: "120px"}}></i>
           <div className="error-text-content" style={{marginLeft: "20px"}}>
              <h3><strong>ERROR: Access Denied</strong></h3>
            <p>You are not logged in. Kindly try <Link to="/login">logging in</Link></p>
           </div>
      </div>
    </div>
  )
}