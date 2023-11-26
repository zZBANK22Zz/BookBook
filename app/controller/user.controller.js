const User = require("../models/user.model")
const bcrypt = require("bcryptjs");

const validUsername = (req, res) => {
    User.checkUsername(req.params.us, (err, data)=>{
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

const createNewUser = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const salt = bcrypt.genSaltSync(10);
    const userObj = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        img: req.body.img,
        role: req.body.role
    });
    User.create(userObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    });
};


// this is a login 

// from chat 1st time 
// const login = (async, (req, res)=>{
//     try {
//         const { username, password } = req.body;
    
//         const selectUser = 'SELECT * FROM users WHERE username = ?';
//         db.query(selectUser, [username], async (err, results) => {
//           if (err) {
//             console.error('Error fetching user:', err);
//             res.status(500).json({ error: 'Internal server error' });
//           } else if (results.length > 0) {
//             const user = results[0];
//             if (await bcrypt.compare(password, user.password)) {
//               const token = jwt.sign({ username: user.username, role: user.role }, 'secret_key', { expiresIn: '1h' });
//               res.status(200).json({ token });
//             } else {
//               res.status(401).json({ message: 'Invalid credentials' });
//             }
//           } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//           }
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });


// from my code
const login = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const acc = new User({
        username: req.body.username,
        password: req.body.password,
        role:     req.body.role
    });
    User.loginModel(acc, (err, data)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({message: "Not found " + req.body.username});
            }
            else if(err.kind == "invalid_pass"){
                res.status(401).send({message: "Invalid Password"});
            }else{
                res.status(500).send({message: "Query error." });
            }
        }else res.send(data);
    });

};

// from chat 2 
// const login = (req, res) => {
//     if (!req.body) {
//       res.status(400).send({ message: "Content can not be empty." });
//       return;
//     }
  
//     const { username, password } = req.body;
  
//     User.loginModel(username, (err, user) => {
//       if (err) {
//         if (err.kind == "not_found") {
//           res.status(401).send({ message: "Not found " + username });
//         } else if (err.kind == "invalid_pass") {
//           res.status(401).send({ message: "Invalid Password" });
//         } else {
//           res.status(500).send({ message: "Query error." });
//         }
//       } else {
//         bcrypt.compare(password, user.password, (bcryptErr, result) => {
//           if (bcryptErr || !result) {
//             res.status(401).json({ message: 'Invalid credentials' });
//           } else {
//             const token = jwt.sign({ username, role: user.role }, 'secret_key', { expiresIn: '1h' });
//             res.status(200).json({ token, role: user.role });
//           }
//         });
//       }
//     });
//   };

const getAllUsers = (req,res)=>{
    User.getAllRecords((err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
};

const updateUserCtrl = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        img: req.body.img
    };
    User.updateUser(req.params.id, data, (err, result)=>{
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

const deleteUser = (req, res)=>{
    console.log("parameters: " + req.params.id + 
    ", " + req.params.p1 + 
    ", " + req.params.p2);
    User.removeUser(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send(
                    {message: "Not found user: " + req.params.id}
                    );
            }
            else{
                res.status(500).send(
                    {message: "Error delete user: " + req.params.id}
                    );
            }
        }else{
            res.send(result);
        }
    });
};

module.exports = { 
    validUsername, 
    createNewUser, 
    login, 
    getAllUsers, 
    updateUserCtrl,
    deleteUser
};