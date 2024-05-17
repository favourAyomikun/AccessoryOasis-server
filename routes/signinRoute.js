const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Testing the login route')
  })


module.exports = router;