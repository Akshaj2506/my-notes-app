const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.post('/create',
   [
      body('name').isLength({ min: 4 }),
      body('email').isEmail(),
      body('password').isStrongPassword()
   ]
   , (req, res) => {
      const errors = validationResult(req);
      if (!(errors.isEmpty())) {
         res.status(400).json({ errors: errors.array() });
      } else {
         const { name, email, password, date} = req.body;
         User.create({
            name : name,
            email : email,
            password : password,
            date : date
         }).then(user => res.json(user))
         .catch(err => res.json({error : err.message}));
      }
   }
);

module.exports = router;