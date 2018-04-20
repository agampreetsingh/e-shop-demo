const route = require('express').Router();
const Product = require('../../db').Product;
const Vendor = require('../../db').Vendor;

route.get('/', (request, response) => {
  Product.findAll()
          .then((products) => response.send(products))
          .catch((err) => response.send("Cannot find products."))
})

route.post('/filter', (request, response) => {
    Vendor.findOne({
      where: {
        name: request.body.name
      }
    }).then((vendor) => {
       if(!vendor) return response.status(400).send("Vendor not found...")
       Product.findAll({
         where: {
           manufacturerId: vendor.id
         }
       }).then((products) => {
          response.status(200).send(products)
       })
    })
  })
route.post('/', (request, response) => {
  if(!request.body.manufacturer || !request.body.price || !request.body.name)
      return response.status(400).send({error: "Provide a manufacturer name and product price"});
  Vendor.findOne({
    where: {name: request.body.manufacturer}
  })
  .then((vendor) => {
    Product.create({
      name: request.body.name,
      price: parseInt(request.body.price),
      manufacturerId: vendor.dataValues.id
    }).then((product) => {
      response.status(200).send(product)
    });
  })
})
module.exports = route;
