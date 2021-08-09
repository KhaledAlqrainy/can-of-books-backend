
const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    title: String,
    description: String,
    status: Boolean,
    email:String
  });

const bookModel = mongoose.model('Book', Book);


module.exports=bookModel