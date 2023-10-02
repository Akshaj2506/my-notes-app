const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;
let success = false;

// Creating an endpoint for User using POST request route: "/api/auth/create"; No Login Required
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
         success = false;
         res.status(400).json({
            errors: errors.array(),
            success: success
         });
      } else {
         // Checking if the user already exists
         const user = await User.findOne({ email: req.body.email });
         if (user) {
            success = false;
            return res.status(400).json({
               error: "User already exists",
               success: success
         });
         }
         // Create user if no issues found
         const { name, email, password} = req.body;
         try {
            const salt = await bcryptjs.genSalt(10);
            const secPass = await bcryptjs.hash(password, salt);
            const createdUser = await User.create({
               name: name,
               email: email,
               password: secPass
            })
            const data = {
               user: {
                  id: createdUser.id
               }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            res.json({ authToken, success });
         } catch (err) {
            success = false
            res.status(500).json({
               error: err.message,
               success: success
            });
         }
      }
   }
);

// Authenticate a user using POST request route "/api/auth/login"
/* 
   @params: 
    -> Username (Check for: Valid email)
    -> Password (Check for: isLength > 5)

   @RESPONSE:
    -> authtoken
*/
router.post('/login',
   [
      body('email', "Enter a valid Email ID").isEmail(),
      body('password', "Enter a password of more than 5 characters").isLength({min: 5})
   ], async (req, res) => {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
         success = false
         return res.status(400).json({
            errors : errors.array(),
            success: success
         });
      }
      try {
         const {email, password} = req.body;
         const user = await User.findOne({email});
         if (!user) {
            success = false   
            return res.status(400).json({
               error : "User does not exist",
               success : success
            });
         }
         const deHashedPassword = await bcryptjs.compare(password, user.password);

         if (!deHashedPassword) {
            success = false   
            return res.status(400).json({
               error : "Kindly enter correct credentials",
               success : success
            });
         }
         const data = {
            user : {
               id : user.id
            }
         }
         const authToken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({authToken, success});
      } catch (error) {
         console.error(error.message);
         success = false;
         res.status(403).json({error: "Internal Server Error", success: success});
      }
   }
)

// POST request to Fetch user data using auth token
// RESPONSE: user data
router.post('/getuser', fetchUser, async (req, res) => {
   const userID = req.user.id;
   const user = await User.findById(userID).select("-password");
   res.json(user);
})

module.exports = router;