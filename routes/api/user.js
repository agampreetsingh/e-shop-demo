const route = require('express').Router();
const Product = require('../../db').Product;
const Vendor = require('../../db').Vendor;
const User = require('../../db').User;


route.post('/', (request, response) => {

    if(!request.body.username || !request.body.password)
      return response.status(400).send({error: "No data found"});
  else{
    User.create({
        username: request.body.username,
        password: request.body.password
      
      }).then((user) => {
        response.status(200).redirect('/signin')
      });
  }
  
})
  

module.exports = route;
