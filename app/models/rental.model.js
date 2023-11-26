const sql = require('./db');
const jwt = require("jsonwebtoken");


const Rental = function(Rental){
    this.user_id = Rental.user_id;
    this.book_id = Rental.book_id;
    this.borrow_date = Rental.borrow_date;
    this.return_date = Rental.return_date;
}

Rental.createRental = (createrant, result)=>{
    sql.query("INSERT INTO rentals SET ?", createrant, (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        result(null, {id: res.insertId, ...createrant, accessToken: token});
        console.log("Created rental:", {id: res.insertId, ...createrant, accessToken: token});
    })
}
module.exports = Rental;
