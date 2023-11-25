const sql = require("./db")
const Book = function(books){
    this.title = books.title;
    this.language = books.language;
    this.publication_date = books.publication_date
    this.author_id = books.author_id;
    this.price = books.price;
    this.img = books.img;
    this.edition = books.edition;
    this.status = books.status;
    this.stock = books.stock;

    //title=?, language=?, publication_date=?, author_id=?, price=?, img=?, edition=?, status=?, stock=?
}
Book.checkBook = (id, result)=>{
    sql.query(`SELECT * FROM books WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("Error: "+err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found Book: "+ res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "Book_not_found"},null);
    });
};

Book.create = (newBook, result)=>{
    sql.query("INSERT INTO books SET ?", newBook, (err, res)=>{
        if(err){
            console.log("Query error: "+err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId,...newBook});
        console.log("Created books:", {id: res.insertId,...newBook});
    });
};

Book.getAllBook = (result)=>{
    sql.query("SELECT * FROM books", (err, res)=>{
        if(err){
            console.log("Query err: "+err);
            result(err,null);
            return;
        }
        result(null, res);
    })
};

Book.updateBook = (id, data, result)=>{
    // removeOldImage(id);
    sql.query("UPDATE books SET title=?, language=?, publication_date=?, author_id=?, price=?, img=?, edition=?, status=?, stock=? WHERE id=?", 
    [data.title, data.language, data.publication_date, data.author_id, data.price, data.img, data.edition, data.status, data.stock,  id], (err, res)=>{
        // title=?, language=?, publication_date=?, author_id=?, price=?, img=?, edition=?, status=?, stock=?
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
        console.log("Update book: " + {id: id, ...data});
        result(null, {id: id, ...data});
        return;
    });
};

Book.deleteById = (id, result) => {
    sql.query('DELETE FROM books WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted books with id: ' + id);
        result(null, res);
    });
};

module.exports = Book;