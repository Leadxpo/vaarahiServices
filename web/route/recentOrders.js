const express = require('express');
const { createRecentOrders, updateRecentOrders, deleteRecentOrders, getRecentOrdersById, getAllRecentOrders, searchRecentOrdersDetails} = require('../service/recentOrders');

const router = express.Router();

//IMAGE CONFRIGATIONS


router.post('/create-recentOrders', async (req, res) => {
    const response = await createRecentOrders(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response); 
    }
});

router.post('/update-recentOrders', async (req, res) => {
    const response = await updateRecentOrders(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.delete('/delete-recentOrders', async (req, res) => {
    const response = await deleteRecentOrders(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-recentOrders-by-id', async (req, res) => {
    const response = await getRecentOrdersById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-recentOrders', async (req, res) => {
    const response = await getAllRecentOrders(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/search-recentOrders', async (req, res) => {
    const response = await searchRecentOrdersDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;
