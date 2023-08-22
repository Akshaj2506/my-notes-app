const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
   title : {
      type: String,
      required: true
   },
   description : {
      type: String
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

module.exports = mongoose.model('note', NotesSchema);