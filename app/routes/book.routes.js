const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const book_controller = require("../controller/book.controller");
    var router = require("express").Router();
    router.get('/books', book_controller.getAllBook);
    router.post('/addbook',book_controller.createBook);
    router.get('/:id',book_controller.getBookId);
    router.delete('/:id',book_controller.deleteBook)
    app.use("/api", router);
    app.use("/api/auth", router);
}; 