const Book = require("../models/book.model");
  
  //Create & Save a new Book
    const createBook = (req, res) => {
    //Validate request
    if(!req.body.author || !req.body.title){
        res.status(400).send({ message: "Book Title & Author can not be empty."});
    }
    //Create a Book 
    const bookObj = new Book({
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        descrip : req.body.descrip,
        review : req.body.review,
        quantity: req.body.quantity,
        img: req.body.img
    });
    Book.create(bookObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating Book"});
        }else res.send(data);
    });
  };
  // Retrive and return all book from DB
    const getAllBook = (req, res)=>{
    Book.getAllBook((err, data)=>{
    if(err){
        res.status(500).send({message: err.message || "Some error ocurred."});
    }else res.send(data);
});
    };
    const getBookId = (req, res) => {
        const bookId = req.params.id;
    Book.checkBook(bookId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `books with id ${bookId} not found. `});
            } else {
                res.status(500).send({ message: `Error retrieving recipe with id ${bookId} `});
            }
        } else {
            res.send(data);
        }
    });
    };


    const deleteBook = (req, res) => {
        const findByIdAndRemove = req.params.id;
    
        Book.deleteById(findByIdAndRemove, (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({ message: `books with id ${findByIdAndRemove} not found. `});
                } else {
                    res.status(500).send({ message: `Error deleting books with id ${findByIdAndRemove} `});
                }
            } else {
                res.send({ message: `books with id ${findByIdAndRemove} was deleted successfully. `});
            }
        });
    };
    
  module.exports = {
    createBook,
    getAllBook,
    getBookId,
    deleteBook,
  };