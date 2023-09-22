import React from 'react'

export default function Menu() {
  return (
    <>
      <div className="container my-3">
        <h2>Hello [user]</h2>
        <h3>Action:</h3>
        <button className="btn btn-primary">Fetch</button>
        <button className="btn btn-success mx-3">Create</button>
        <button className="btn btn-warning me-3">Update</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </>
  )
}
