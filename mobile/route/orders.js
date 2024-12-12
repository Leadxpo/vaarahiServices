const orderService = require('../service/orders');
const route = require('express');
const router = route.Router();
const path = require('path');



// CREATE orders

router.post('/create-Order', async (req, res) => {
    const response = await orderService.createOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE orders

router.post('/update-Order', async (req, res) => {
    const response = await orderService.updateOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// DELETE orders

router.post('/delete-Order-by-id', async (req, res) => {
    const response = await orderService.deleteOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET orders

router.post('/get-Order-by-id', async (req, res) => {
    const response = await orderService.getOrderById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET orders BASED ON User-ID

router.post('/get-Order-by-userID', async (req, res) => {
    const response = await orderService.getOrderByuserID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET assigned orders BASED ON Staff-ID

router.post('/get-assigned-order-by-staffID', async (req, res) => {
    const response = await orderService.getAssignedOrderByStaffID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT orders

router.post('/count-all-Orders', async (req, res) => {
    const response = await orderService.countAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH orders

router.post("/search-Order", async (req, res) => {
    let response = await orderService.searchOrderDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;