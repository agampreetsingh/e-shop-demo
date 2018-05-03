const express=require('express');
const route=express();
const passport=require('../passport')

route.get('/logout',(request,response)=>{
    request.logout();
    response.redirect('/signin');
})
route.get('/signin',(request,response)=>{
    if(!request.user)
    return response.sendFile('signin.html',{root:'./public'});
response.redirect('/products');
    
})

route.get('/signup',(req,res)=>{
    res.sendFile('signup.html',{root:'./public'});
})

route.get('/cart',(request,response)=>{
    if(!request.user)
    return response.sendFile('signin.html',{root:'./public'});

    response.sendFile('cart.html',{root:'./public'});
})

route.get('/products',(req,res)=>{
    res.sendFile('index.html',{root:'./public'});
})


route.post('/signin',passport.authenticate('local'),(req,res)=>
{
    if(!req.user){
res.send("Unable to create user")

    }
    else
    res.redirect('/products');
})
route.get('/addproduct',(request,response)=>{
    if(!request.user)
    return response.sendFile('signin.html',{root:'./public'});
response.sendFile('products.html',{root:'./public'});
})
module.exports=route;

