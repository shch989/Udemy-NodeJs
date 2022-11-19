const path = require('path')
const express = require('express');

const rootDir = require('../helper/path')

const router = express.Router();

// /admin/add-produc => GET
router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

// /admin/add-produc => POST
router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
})

module.exports = router;