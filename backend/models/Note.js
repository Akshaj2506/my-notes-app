const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new mongoose.Schema({
   user : {
      type: Schema.ObjectId,
      ref: "user"
   },
   title : {
      type: String,
      required: true
   },
   description : {
      type: String,
      required: true
   },
   tag : {
      type: String,
      default: "general"
   },
   dateCreated : {
      type: Date,
      default : Date.now
   }
})

const Note = mongoose.model('note', NotesSchema);
module.exports = Note;