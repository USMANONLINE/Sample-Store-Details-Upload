const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'storedb.sqlite'
});

const Model = Sequelize.Model;

// Product model
class Product extends Model {}
Product.init({
  productName: {
    type: Sequelize.STRING
  },
  productPrice: {
    type: Sequelize.STRING
  },
  productColor: {
    type: Sequelize.STRING
  },
  productDetails: {
    type: Sequelize.STRING
  },
  productQuantityAvailable: {
    type: Sequelize.STRING
  },
  productImg1: {
    type: Sequelize.STRING
  },
  productImg2: {
    type: Sequelize.STRING
  },
  productImg3: {
    type: Sequelize.STRING
  }
}, { sequelize, modelName: 'product' });

// sequelize.sync().then(response => {
//   console.log(response)
// }).catch(error => {
//   console.log(error)
// })

module.exports = { Product }