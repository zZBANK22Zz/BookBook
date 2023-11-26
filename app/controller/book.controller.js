const Book = require("../models/book.model");

const createBook = (req, res) => {
    if(!req.body){
    // if(!req.body.author || !req.body.title){
        res.status(400).send({ message: "Book Title & Author can not be empty."});
    }
    const bookObj = new Book({
        title : req.body.title,
        language : req.body.language,
        publication_date : req.body.publication_date,
        author_id : req.body.author_id,
        price : req.body.price,
        img : req.body.img,
        edition : req.body.edition,
        status : req.body.status,
        stock : req.body.stock

        // this.title = books.title;
        // this.language = books.language;
        // this.publication_date = books.publication_date
        // this.author_id = books.author_id;
        // this.price = books.price;
        // this.img = books.img;
        // this.edition = books.edition;
        // this.status = books.status;
        // this.stock = books.stock;
    });
    Book.create(bookObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating Book"});
        }else {res.send(data)};
    });
  };

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

    const updateBook = (req, res)=>{
        if(!req.body){
            res.status(400).send({message: "Content can not be empty."});
        }
        const data = {
            title : req.body.title,
            language : req.body.language,
            publication_date : req.body.publication_date,
            author_id : req.id,
            price : req.body.price,
            img : req.body.img,
            edition : req.body.edition,
            status : req.body.status,
            stock : req.body.stock
        };
        Book.updateBook(req.params.id, data, (err, result)=>{
            if(err){
                if(err.kind == "not_found"){
                    res.status(401).send(
                        {message: "Not found user: " + req.params.id}
                        );
                }else {
                    res.status(500).send(
                        {message: "Error update user: " + req.params.id}
                    );
                }
            }else {
                res.send(result);
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
    updateBook,
    deleteBook,
  };