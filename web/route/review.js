const reviewServices = require('../service/review');
const route = require('express');
const router = route.Router();

// // CREATEreview

router.post('/create-review', async (req, res) => {
    const response = await reviewServices.createReview(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// update review

router.post('/update-review', async (req, res) => {
    const response = await reviewServices.updateReview(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE review

router.post('/delete-review-by-id', async (req, res) => {
    const response = await reviewServices.deleteReview(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET review

router.post('/get-review-by-id', async (req, res) => {
    const response = await reviewServices.getReviewById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL reviewS 

router.get('/get-all-review', async (req, res) => {
    const response = await reviewServices.getAllReview(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH review DETAILS

router.post('/search-review', async (req, res) => {
    const response = await reviewServices.searchReviewDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.post('/count-review', async (req, res) => {
    const response = await reviewServices.countReviewDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;