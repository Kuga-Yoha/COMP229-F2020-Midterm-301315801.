/*
COMP229-F2020-MidTerm-
Kugavathanan Yohanathan
301315801
MyFavouriteBooks
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: "Add Book",
    books: {},
    action: "add"
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre

  })

  book.create(newBook, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });



});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  book.findById(id, (err, Book) => {
    if (err) {
      res.end(err);
    } else {
      res.render('books/details', {
        title: "Edit Book",
        books: Book,
        action: "edit"
      });
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id',(req,res,next)=>{
  let id = req.params.id;

  let updatedBook = {
   _id :id,
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  };
  Contact.updateOne({_id:req.params.id},{$set:updatedBook},(err, contact)=>{
    if(err){
         //console.error(err);
         res.end(err); 
        //  res.redirect('/error');
    }else{
        res.redirect("/books");
    }
});
  
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.deleteOne({_id:id}, (err) => {
    if(err){
      res.end(err);
    }else{
      res.redirect('/books');
    }
  });

});


module.exports = router;
