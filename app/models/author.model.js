const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const author = function(author){
    this.name = author.name;
    this.description = author.description;
    this.photo = author.photo;
    this.dob = author.dob;
    this.book_id = author.book_id;
}
author.checkAuthorname = (name, result)=>{
    sql.query("SELECT * FROM authors WHERE name='"+name+"'",(err,res)=>{
        if(err){
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Found authorname: " + res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found"}, null);
    });
};

author.create = (newAuthor, result)=>{
    sql.query("INSERT INTO authors SET ?", newAuthor, (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        result(null, {id: res.insertId, ...newAuthor, accessToken: token});
        console.log("Created author:", {id: res.insertId, ...newAuthor, accessToken: token});
    });
};

author.loginModel = (account, result)=>{
    sql.query("SELECT * FROM authors WHERE name=?", [account.name], (err, res)=>{
        if(err){
            console.log("err:" + err);
            result(err, null);
            return;
        }
        // if(res.length){
        //     const validPassword = bcrypt.compareSync(account.password, res[0].password);
        //     if(validPassword){
        //         const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        //         console.log("Login success. Token: " + token);
        //         res[0].accessToken = token;
        //         result(null, res[0]);
        //         return;
        //     }else{
        //         console.log("Password not match");
        //         result({kind: "invalid_pass"}, null);
        //         return;
        //     }
        // }
        result({kind: "not_found"}, null);
    });
};

author.getAllRecords = (result)=>{
    sql.query("SELECT * FROM authors", (err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};
//const, var, let => function scope
const removeOldImage = (id, result) => {
    sql.query("SELECT * FROM authors WHERE id=?", [id], (err, res)=>{
        if(err){
            console.log("error:" + err);
            result(err, null);
            return;
        }
        if(res.length){
            let filePath = __basedir + "/assets/" + res[0].img;
            try {
                if(fs.existsSync(filePath)){
                    fs.unlink(filePath, (e)=>{
                        if(e){
                            console.log("Error: " + e);
                            return;
                        }else{
                            console.log("File: " + res[0].img + " was removed");
                            return;
                        }
                    });
                }else {
                    console.log("File: " + res[0].img + " not found.")
                    return;
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }
    });
};

author.updateUser = (id, data, result)=>{
    removeOldImage(id);
    sql.query("UPDATE authors SET name=?, description=?, photo=?,dob=? book_id=? WHERE id=?", 
    [data.name, data.description, data.photo, data.dob, id], (err, res)=>{
        if(err){
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            //NO any record update
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Update author: " + {id: id, ...data});
        result(null, {id: id, ...data});
        return;
    });
};
author.removeUser = (id, result)=>{
    removeOldImage(id);
    sql.query("DELETE FROM authors WHERE id=?", [id], (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Deleted author id: " + id);
        result(null, {id: id});
    } );
};
module.exports = author;