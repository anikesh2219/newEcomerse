const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const productRouter = require('./routes/product');

const app = express();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);


app.use(bodyParser.json());

app.use('/product', productRouter);

const port = 3001;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected!');
    app.listen(port, () => {
      console.log('Server is up and running on port number ' + port);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  })
  
