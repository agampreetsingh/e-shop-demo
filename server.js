const express = require('express')
const path = require('path')
const app = express();

app.use(express.json());

app.use(express.urlencoded({
  extended : true
}));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes/api'))


app.listen(8181, () => {
  console.log("Server started at localhost:8181")
})
