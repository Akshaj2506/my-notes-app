const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
   res.json({
      resp: "You are accessing auth api"
   })
});

module.exports = router;