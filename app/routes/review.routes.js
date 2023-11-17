module.exports = (app) => {
    const review_controller = require('../controller/review.controlloer');
    var router = require('express').Router();
    
    // Create a new review
    router.post('/add', review_controller.createReview);
    
    // Retrieve all reviews
    router.get('/allreview', review_controller.getAllReviews);
    
    // Update a review by ID
    router.put('/:id', review_controller.updateReview);
    
    // Delete a review by ID
    router.delete('/:id', review_controller.deleteReview);

    app.use('/api/review', router);
};
