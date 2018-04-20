const route = require('express').Router();
const Cart= require('../../db').Cart;
const Product = require('../../db').Product;

route.get('/', (request, response) => {
  Cart.findAll()
          .then((products) => response.status(200).send(products))
          .catch((err) => response.status(400).send("No products found..."))
})

route.post('/:id', (request, response) => {
  Product.findOne({
    where: {
      id: request.params.id
    }
  })
          .then((product) => {
            Cart.create({
              productId: request.params.id,
              name: product.name,
              price: product.price
            }).then((added) => {
              response.status(200).send(added)
            }).catch((err) => response.status(400).send({error: "Sorry, cannot add product."}));
          })
          .catch((err) => response.status(403).send("Invalid Product ID"))
})
route.post('/dec/:id', (request, response) => {
  Cart.findOne({
    where: {
      id: request.params.id
    }
  }).then((product) => {
    if(!product) if((product.quantity == 0))
      return response.status(400).send({error: "Not a product"});
      if((product.quantity == 0))
      return response.status(400).send({error: "Invalid Quantity"});

    Cart.update({
      quantity: product.quantity-1
    },  {
      where: {
        id: request.params.id
      }
    }).then((productId) => {
      response.status(200).send(productId);
    })
  });
})
route.post('/inc/:id', (request, response) => {
  Cart.findOne({
    where: {
      id: request.params.id
    }
  }).then((product) => {
    if(!product)  return response.status(400).send({error: "Invalid product"});
    Cart.update({
      quantity: product.quantity+1
    },  {
      where: {
        id: request.params.id
      }
    }).then((productId) => {
      response.status(200).send(productId);
    })
  });
})

module.exports = route;
