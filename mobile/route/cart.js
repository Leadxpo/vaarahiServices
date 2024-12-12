const express = require('express');
const { updateCart,updateCartByProductID, createCart, deleteCart,getCartByUserID, getCartById, searchCartDetails } = require('../service/cart');

const router = express.Router();
//IMAGE CONFRIGATIONS

router.post('/create-cart', async (req, res) => {
    const response = await createCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


router.post('/update-cart', async (req, res) => {
    const response = await updateCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-cart-by-productID', async (req, res) => {
    const response = await updateCartByProductID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-cart-by-id', async (req, res) => {
    const response = await getCartById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-cart-by-userID', async (req, res) => {
    const response = await getCartByUserID(req);
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

router.post('/delete-cart', async (req, res) => {
    const response = await deleteCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;
