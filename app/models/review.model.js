const sql = require('./db');

const Review = function(review){
    this.book = review.book;
    this.score = review.score;
    this.review = review.review;
}

Review.create = (newReview, result) => {
    sql.query('INSERT INTO review SET ?', newReview, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newReview });
    });
};

Review.getAll = (result) => {
    sql.query('SELECT * FROM review', (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Review.updateById = (id, data, result) => {
    sql.query('UPDATE review SET bookId=?, score=?, review=? WHERE id=?', [data.book, data.score, data.review, id], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Updated review: ' + { id: id, ...data });
        result(null, { id: id, ...data });
    });
};

Review.deleteById = (id, result) => {
    sql.query('DELETE FROM review WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted review id: ' + id);
        result(null, { id: id });
    });
};

module.exports = Review;