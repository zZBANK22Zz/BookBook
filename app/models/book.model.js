const sql = require("./db")
const Book = function(book){
    this.title = books.title;
    this.author = books.author;
    this.price = books.price;
    this.descrip = books.descrip;
    this.review = books.review;
    this.quantity = books.quantity;
    this.img = books.img;
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