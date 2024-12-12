const userRemoveRequestServices = require('../service/usersRemoveRequest');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

// // CREATE userRemoveRequestServices

router.post('/create-userRemoveRequest', async (req, res) => {
    const response = await userRemoveRequestServices.createUserRemoveRequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// update userRemoveRequest

router.post('/update-userRemoveRequest', async (req, res) => {
    const response = await userRemoveRequestServices.updateUserRemoveRequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET ALL userS 

router.get('/get-all-userRemoveRequest', async (req, res) => {
    const response = await userRemoveRequestServices.getAllUserRemoveRequest(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;