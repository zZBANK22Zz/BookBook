const Rental = require('../models/rental.model');
const bcrypt = require("bcryptjs");

// class RentalController {
//     static rentBook(req, res) {
//         const rentalData = {
//             user_id: req.body.user_id,
//             book_id: req.body.book_id,
//             borrow_date: req.body.borrow_date,
//             return_date: req.body.return_date
//         };

//         Rental.createRental(rentalData, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }
//             res.status(201).json({ message: 'Book rented successfully', rental_id: result.insertId });
//         });
//     }
// }

const createRental = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    // const salt = bcrypt.genSaltSync(10);
    const rentalObj = new Rental({
            user_id: req.body.user_id,
            book_id: req.body.book_id,
            borrow_date: req.body.borrow_date,
            return_date: req.body.return_date
    });
    Rental.createRental(rentalObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    });
};

module.exports = {createRental};
