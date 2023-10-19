const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const book_controller = require("../controller/book.controller");
    var router = require("express").Router();
    router.get('/', book_controller.getAllBook);
    router.post('/add',book_controller.createBook);
    router.get('/:id',book_controller.getBookId);
    router.delete('/:id',book_controller.deleteBook)
    app.use("/api/books", router);
}; 