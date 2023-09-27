
export default function NotesItem(props) {
   console.log(props)
  return (
     <div className="card md-3 mx-3" style={{ width: "18rem" }}>
        <div className="card-body">
           <h5 className="card-title">{props.title}</h5>
           <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
           <p className="card-text">{props.description}</p>
        </div>
     </div>
  )
}
