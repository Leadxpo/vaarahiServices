const express = require('express');
const {updateWishlist,createWishlist, getWishlistById, getWishlistByUserID,deleteWishlist, searchWishlistDetails} = require('../service/wishlist');

const router = express.Router();
//IMAGE CONFRIGATIONS

router.post('/create-wishlist', async (req, res) => {
    const response = await createWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response); 
    }
});

router.post('/update-wishlist', async (req, res) => {
    const response = await updateWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-wishlist-by-id', async (req, res) => {
    const response = await getWishlistById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-Wishlist-by-userID', async (req, res) => {
    const response = await getWishlistByUserID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/search-wishlist', async (req, res) => {
    const response = await searchWishlistDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/delete-wishlist', async (req, res) => {
    const response = await deleteWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;
