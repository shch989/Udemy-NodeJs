const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // 이전 Cart를 파일에서 불러옴
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }
    // 분석하여 제품이 이미 있는지 확인
    const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
    const existingProduct = cart.products[existingProductIndex]
    let updatedProduct;
    // 기존 제품을 찾고 새로운 제품을 추가하거나 수량 증가
    if(existingProduct) {
      // 기존 제품이 Cart에 있다면 수량만 1증가
      updatedProduct = { ...existingProduct }
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct
    } else {
      // 기존 제품이 Cart에 없다면 id와 수량 값을 넣고 업데이트
      updatedProduct = { id: id, qty: 1 }
      cart.products = [...cart.products, updatedProduct]
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
    fs.writeFile(p, JSON.stringify(cart), err => {
      console.log(err);
    })
    })
  }
}