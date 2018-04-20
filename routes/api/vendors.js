const route = require('express').Router();
const Vendor = require('../../db').Vendor;

route.get('/', (request, response) => {
  Vendor.findAll()
        .then((vendors) => response.status(200).send(vendors))
        .catch((err) => response.status(403).send(err));
});
route.post('/', (request, response) => {
  if(!request.body.name) return response.send({error: "Vendor not found"})
  Vendor.create({name: request.body.name})
        .then((vendor) => {
            response.status(200).send(vendor)
        })
        .catch((err) => {
            response.status(403).send("Cannot add vendor")
       })
});
module.exports = route;
