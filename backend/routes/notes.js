const express = require('express');
const {body, validationResult} = require('express-validator');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');

router.post('/createnote', fetchUser,[
   body('title', 'Title should be atleast 3 characters').isLength({ min: 3}),
   body('description', "The description should be at least 10 characters").isLength({min : 10})
], async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!(errors.isEmpty())) {
         res.status(400).json({errors : errors.array()});
      } else {
         const {title, description, tag} = req.body;
         const createdNote = await Note.create({
            user : req.user.id,
            title : title,
            description: description,
            tag: tag
         })
         res.json(createdNote);
      }
   } catch (error) {
      console.error(error.message);
      res.status(401).json({error : "Internal Server Error"});
   }
   
})

router.get('/fetchallnotes', fetchUser, async (req, res) => {
   try {
      const notes = await Note.find({user : req.user.id});
      res.json({notes: notes})
   } catch (error) {
      console.error(error.message);
      res.status(401).json({error : "Internal Server Error"});
   }

})

module.exports = router;