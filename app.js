const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const errorController = require('./controllers/error')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views')

// Router require
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

// bodyParser 기본설정
app.use(bodyParser.urlencoded({extended: false}));
// css 경로 추적
app.use(express.static(path.join(__dirname, 'public')))

const port = 5000

// Router
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 페이지
app.use(errorController.get404)

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}/`)
})