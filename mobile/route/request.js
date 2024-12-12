const requestService = require('../service/request');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

// CREATE REQUEST AMOUNT

router.post('/create-request', async (req, res) => {
    const response = await requestService.createrequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE REQUEST AMOUNT

router.post('/update-request', async (req, res) => {
    const response = await requestService.updaterequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE REQUEST AMOUNT

router.post('/delete-request', async (req, res) => {
    const response = await requestService.deleterequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET REQUEST AMOUNT BY ID

router.post('/get-request-by-staffID', async (req, res) => {
    const response = await requestService.getrequestById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL REQUEST AMOUNTS
router.get('/get-all-request-by-staffID', async (req, res) => {
    const response = await requestService.getAllrequestsByStaffID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});
router.post('/get-pending-request-by-staffID', async (req, res) => {
    const response = await requestService.getPendingRequestsByStaffID(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;