const express = require('express')
const app = express()
const port = 5000

app.use((req, res, next) => {
  console.log('In the middleware!');
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}/`)
})