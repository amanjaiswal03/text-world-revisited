const express = require('express');
const graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv');

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect("mongodb+srv://admin:admin123456@cluster0-pyv3r.mongodb.net/Text-World?retryWrites=true&w=majority", { 
    useUnifiedTopology: true,    
    useNewUrlParser: true 
});

mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.listen(4000)