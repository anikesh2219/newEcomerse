var mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
},{timestamps:true});

const list = new mongoose.model("books", BookSchema)

module.exports = list
