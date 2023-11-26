const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const rental_controller = require("../controller/rental.contraller");
    var router = require("express").Router();
    router.post("/book", rental_controller.createRental);
    app.use("/api/rent", router);
};
