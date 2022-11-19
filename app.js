const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// Router require
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

const port = 5000

// Router
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}/`)
})