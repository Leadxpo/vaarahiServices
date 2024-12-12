const express = require('express');
const { createWishlist, updateWishlist, deleteWishlist, getWishlistById, getAllWishlist, searchWishlistDetails} = require('../service/wishlist');

const router = express.Router();
const multer = require('multer')
const path = require('path')

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

router.delete('/delete-wishlist', async (req, res) => {
    const response = await deleteWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-wishlist-by-id', async (req, res) => {
    const response = await getWishlistById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-wishlist', async (req, res) => {
    const response = await getAllWishlist(req);
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

// router.post('/bulkUpload', upload.single('csv_file'), async (req, res) => {
//     const response = await bulkWishlistUpload(req);
//     if (response.success) {
//         res.json(response)
//     } else {
//         res.status(500).json(response);
//     }
// });

module.exports = router;
