const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.post('/create',
   [
      body('name', "Minimum length of name should be 4 characters").isLength({ min: 4 }),
      body('email', "Wrong format of email entered").isEmail(),
      body('password', "Password is not strong enough").isStrongPassword()
   ]
   , async (req, res) => {
      // Checking for any sort of errors in the request, return errors
      const errors = validationResult(req);
      if (!(errors.isEmpty())) {
         res.status(400).json({ errors: errors.array() });
      } else {
         // Checking if the user already exists
         const user = await User.findOne({email : req.body.email});
         if (user) {
            return res.status(400).json({error: "User already exists"});
         }
         // Create user if no issues found
         const { name, email, password, date} = req.body;
         try {
            const createdUser = await User.create({
               name : name,
               email : email,
               password : password,
               date : date
            })
            res.json(createdUser)
         } catch(err) {
            res.status(500).json({ error: err.message });
         }
      }
   }
);

module.exports = router;