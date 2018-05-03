const route =require('express').Router();



 route.use('/vendors', require('./vendors'));
 
 route.use('/cart', require('./cart'));
 
 route.use('/products', require('./products'));
 route.use('/user', require('./user'));
route.use('/', (request, response) => {
  response.status(404).send('Inside Index.js')
})

module.exports = route
