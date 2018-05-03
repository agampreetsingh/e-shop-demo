const route = require('express').Router();
const Cart= require('../../db').Cart;
const Product = require('../../db').Product;
const User = require('../../db').User;

route.get('/', (request, response) => {
  Cart.findAll({
    where: {
      userId: request.user.id
    }
  })
          .then((products) => response.status(200).send(products))
          .catch((err) => response.status(400).send("No products found"))
})
route.post('/:id', (request, response) => {
  if(!request.user) return response.status(449).send({err: 'Login to proceed'});
  Product.findOne({
    where: {
      id: request.params.id
    }
  })
          .then((product) => {
            Cart.findAll({
              where: {
                productId: product.id
              }
            }).then((cartProduct) => {
              for(p of cartProduct)
                 if(p.userId == request.user.id)
                    return response.status(449).send({err:"Already in cart"})
              Cart.create({
                productId: request.params.id,
                userId: request.user.id,
                name: product.name,
                price: product.price
              }).then((added) => {
                response.status(200).send(added)
              }).catch((err) => response.status(400).send({error: "Cannot add"}));
            })

          })
          .catch((err) => response.status(403).send("Invalid request"))
})
route.post('/dec/:id', (request, response) => {
  Cart.findOne({
    where: {
      id: request.params.id
    }
  }).then((product) => {
    if(!product || product.quantity == 0)
      return response.status(400).send({error: "Invalid request, Can't be zero"});
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
    if(!product)  return response.status(400).send({error: "Product doesn't exists."});
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
