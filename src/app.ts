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

app.listen(process.env.PORT, 4000)