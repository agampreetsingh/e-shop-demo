const Sequelize = require('sequelize')

const db = new Sequelize('shoppingdb', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

db.authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.error("Unable to authenticate."))

const Vendor = db.define('vendors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Product = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }

});

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Product.belongsTo(Vendor, {foreignKey: 'manufacturerId'})
Cart.belongsTo(Product, {foreignKey: 'productId'});
db.sync().then(() => console.log("Database created successfully."));



module.exports = {
  Vendor, Product, Cart
}
