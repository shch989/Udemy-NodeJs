const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views')

// Router require
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop')

// bodyParser 기본설정
app.use(bodyParser.urlencoded({extended: false}));
// css 경로 추적
app.use(express.static(path.join(__dirname, 'public')))

const port = 5000

// Router
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// 404 페이지
app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle : 'Page Not Found'})
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}/`)
})