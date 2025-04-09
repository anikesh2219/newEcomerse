var mongoose = require('mongoose');


const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const account = new mongoose.model("User", LoginSchema)

module.exports= account

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publishDate: { type: Date, required: true },
})

const list = new mongoose.model("books", BookSchema)

module.exports = list

const OrderSchema  = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'list', required: true },
    quantity: { type: Number, required: true, min: 1 },
    orderDate: { type: Date, default: Date.now }
  });
  
  const bookorder = mongoose.model('Order', OrderSchema);
  
  
  module.exports = bookorder
  

