const author = require("../models/author.model");
const bcrypt = require("bcryptjs");

const validAuthorname = (req, res) => {
    author.validAuthorname(req.params.us, (err, data)=>{
        if(err) {
            if(err.kind == "not_found"){
                res.send({
                    message: "Not Found: " + req.params.us,
                    valid: true
                });
            }
            else {
                res.status(500).send({ 
                    message: "Error query: " + req.params.us
                });
            }
        }else{
            res.send({record: data, valid: false});
        }
    });
};

const createNewAuthor = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const salt = bcrypt.genSaltSync(10);
    const authorObj = new author({
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        dob: req.body.dob,
        book_id: req.body.id
    });
    author.create(authorObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    });
};

const login = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const acc = new author({
        name: req.body.name
    });
    // author.loginModel(acc, (err, data)=>{
    //     if(err){
    //         if(err.kind == "not_found"){
    //             res.status(401).send({message: "Not found " + req.body.username});
    //         }
    //         else if(err.kind == "invalid_pass"){
    //             res.status(401).send({message: "Invalid Password"});
    //         }else{
    //             res.status(500).send({message: "Query error." });
    //         }
    //     }else res.send(data);
    // });
};

const getAllAuthor = (req,res)=>{
    author.getAllRecords((err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
};

const updateAuthor = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const data = {
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        dob: req.body.dob,
        book_id: req.body.book_id
    };
    author.updateAuthor(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send(
                    {message: "Not found author: " + req.params.id}
                    );
            }else {
                res.status(500).send(
                    {message: "Error update author: " + req.params.id}
                );
            }
        }else {
            res.send(result);
        }
    });
};

const deleteAuthor = (req, res)=>{
    console.log("parameters: " + req.params.id + 
    ", " + req.params.p1 + 
    ", " + req.params.p2);
    author.removeAuthor(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send(
                    {message: "Not found author: " + req.params.id}
                    );
            }
            else{
                res.status(500).send(
                    {message: "Error delete author: " + req.params.id}
                    );
            }
        }else{
            res.send(result);
        }
    });
};

module.exports = { 
    validAuthorname, 
    createNewAuthor, 
    login, 
    getAllAuthor, 
    updateAuthor,
    deleteAuthor
};