const fs = require('fs');
const path = require('path')

// 환경변수 설정
const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'products.json'
);

// 콜백함수
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err) {
      return cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // input에서의 title값 json객체에 저장
  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      })
    });
  }

  // 객체에 있는 모든 요소
  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  // 상품의 ID가 JSON에 있는지 확인
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
}