const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const productRouter = require('./routes/product');

const app = express();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/product', productRouter);

const port = 3001;

// db.once('open', function () {
//     console.log('Connected!');
//     app.listen(port, () => {
//         console.log('Server is up and running on port numner ' + port);
//     });
// });

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
  
