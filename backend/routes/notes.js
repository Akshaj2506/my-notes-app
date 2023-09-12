const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');

router.post('/createnote', fetchUser, [
   body('title', 'Title should be atleast 3 characters').isLength({ min: 3 }),
   body('description', "The description should be at least 10 characters").isLength({ min: 10 })
], async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!(errors.isEmpty())) {
         res.status(400).json({ errors: errors.array() });
      } else {
         const { title, description, tag } = req.body;
         const createdNote = await Note.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
         })
         res.json(createdNote);
      }
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
})

router.get('/fetchallnotes', fetchUser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json({ notes: notes })
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
   try {
      const {title, description, tag} = req.body;
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      const note = await Note.findById(req.params.id);
      if (!note) res.status(404).json({error: "Note not found"});
      if (req.user.id !== note.user.toString()) res.status(401).json({error : "Access not granted"});

      const updatedNote = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new: true});
      res.json(updatedNote);
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
})

router.delete('/removenote/:id', fetchUser, async (req, res) => {
   const targetNote = await Note.findById(req.params.id);
   if (!targetNote) return res.status(404).json({error : "Record Not Found"});
   if (targetNote.user.toString() !== req.user.id) return res.status(403).json({error : "Access Denied"});
   Note.findByIdAndDelete({_id : req.params.id}).then(res.json({resp: "Note Deleted Successfully"}));
})

module.exports = router;