const express = require('express');
const {  updateCart, getCartById, getAllCart, searchCartDetails} = require('../service/cart');

const router = express.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS


router.post('/update-cart', async (req, res) => {
    const response = await updateCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-cart-by-id', async (req, res) => {
    const response = await getCartById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-cart', async (req, res) => {
    const response = await getAllCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/search-cart', async (req, res) => {
    const response = await searchCartDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;
