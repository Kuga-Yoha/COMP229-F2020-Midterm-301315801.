/*
COMP229-F2020-MidTerm-
Kugavathanan Yohanathan
301315801
MyFavouriteBooks
*/
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
