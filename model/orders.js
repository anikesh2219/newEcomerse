var mongoose = require('mongoose')

const OrderSchema  = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'list', required: true },
    quantity: { type: Number, required: true, min: 1 },
    orderDate: { type: Date, default: Date.now }
  });
  
  const bookorder = mongoose.model('Order', OrderSchema);
  
  
  module.exports = bookorder
  