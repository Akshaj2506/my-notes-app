const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/create',(req, res) => {
   const user = User(req.body);
   user.save();
   res.json(req.body);
});

module.exports = router;