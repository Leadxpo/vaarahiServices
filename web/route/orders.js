const orderService = require('../service/orders');
const route = require('express');
const router = route.Router();
const path = require('path')



// CREATE orderS

router.post('/create-Order', async (req, res) => {
    const response = await orderService.createOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE orderS

router.post('/update-Order', async (req, res) => {
    const response = await orderService.updateOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET orderS

router.post('/get-Order-by-id', async (req, res) => {
    const response = await orderService.getOrderById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET orderS BASED ON User-ID

router.post('/get-Order-by-userid', async (req, res) => {
    const response = await orderService.getOrderByUserID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL orderS 

router.get('/get-all-Order', async (req, res) => {
    const response = await orderService.getAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT orderS

router.post('/count-all-Orders', async (req, res) => {
    const response = await orderService.countAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH orderS

router.post("/search-Order", async (req, res) => {
    let response = await orderService.searchOrderDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

router.post("/excel-Order", async (req, res) => {
    let response = await orderService.excelOrder(req);
    res.setHeader('Content-Disposition', 'attachment; filename=order-details.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(response);
});

module.exports = router;