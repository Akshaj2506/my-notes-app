const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config("../.env");
const JWT_SECRET = process.env.JWT_SECRET;

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
            const salt = await bcryptjs.genSalt(10);
            const secPass = await bcryptjs.hash(password, salt);
            const createdUser = await User.create({
               name : name,
               email : email,
               password : secPass,
               date : date
            })
            const data = {
               user : {
                  id: createdUser.id
               }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
         } catch(err) {
            res.status(500).json({ error: err.message });
         }
      }
   }
);

module.exports = router;