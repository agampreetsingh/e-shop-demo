const express = require('express')
const path = require('path')
const session=require('express-session')
const app = express();

const passport= require('./passport')

app.use(express.json());

app.use(express.urlencoded({
    extended : true
  }));
  
  app.use(session({
    secret:'some very very secret thing',
    resave:false,
    saveUninitialized:true
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  


app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/pages'))
app.use('/api', require('./routes/api'))


app.listen(process.env.PORT || 8181, () => {
  console.log("Server started at localhost")
})
