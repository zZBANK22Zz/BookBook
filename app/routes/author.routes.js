const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const author_controller = require("../controller/author.controller");
    var router = require("express").Router();
    router.get("/:us", author_controller.validAuthorname);
    router.post("/signin", author_controller.createNewAuthor);
    router.post("/login", author_controller.login);
    router.get("/",author_controller.getAllAuthor);
    router.put("/:id",author_controller.updateAuthor);
    router.delete("/:id",author_controller.deleteAuthor);
    app.use("/api/author", router);
};