"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const dataHelpers = require('./db/data-helper.js')(knex);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//----------------------CONNECTIONS ROUTE----------------------//


app.get('/', (req, res) => {
  res.send("HELLO");
});

app.get('/user/:id', (req,res) => {
  dataHelpers.getUsersProfileById(Number(req.params.id))
  .then((data) => {
    res.json(data);
  })
})

//----------------------GET USER PROFILE PAGE NUGGETS----------------------//
app.get('/user/:id/nuggets', (req,res) => {
  dataHelpers.getPersonalProfileNuggetsById(Number(req.params.id))
  .then((data) => {
    res.json(data);
  })
});

//----------------------GET NUGGETS FOR THE CONNECTIONS -------------------//


//----------------------GET CONNECTION ROUTE----------------------//
app.get('/user/:id/connections', (req, res) => {
  dataHelpers.getUsersConnectionsById(Number(req.params.id))
  .then((data)=> {
    res.json(data);
  })
});

app.get('')

//----------------------REMOVE CONNECTION ROUTE----------------------//
app.post('/connections/:connection_id/delete', (req, res) => {
  dataHelpers.deleteConnectionById(req.params.connection_id)
    .then((data) => {
      console.log('THIS IS FROM THE SERVER.JS', data)
    })
});

//----------------------GO TO TARGET PAGE----------------------//



app.listen(PORT, '0.0.0.0', () => {
  console.log("PAI is running on port: " + PORT);
});