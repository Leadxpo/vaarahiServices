const userServices = require('../service/users');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/userDP/")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + path.extname(file.originalname));
            }
        }
    )

var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    }
);


// // CREATE user

router.post('/create-User', async (req, res) => {
    const response = await userServices.createUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// update user

router.post('/update-User',upload.single("userdp"), async (req, res) => {
    const response = await userServices.updateUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/login-user', async (req, res) => {
    const response = await userServices.userLogin(req.body);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// DELETE user

router.post('/delete-User-by-id', async (req, res) => {
    const response = await userServices.deleteUser(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET user

router.post('/get-User-by-id', async (req, res) => {
    const response = await userServices.getUserById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL userS 

router.get('/get-all-User', async (req, res) => {
    const response = await userServices.getAllUser(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH user DETAILS

router.post('/search-User', async (req, res) => {
    const response = await userServices.searchUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.post('/count-User', async (req, res) => {
    const response = await userServices.countUserDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;