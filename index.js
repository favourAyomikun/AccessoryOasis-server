const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Testing the backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// r9H8K5muVCFMeAa5