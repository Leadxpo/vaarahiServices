const requestService = require('../service/request');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/requests")
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

// CREATE REQUEST AMOUNT

router.post('/create-request',upload.single("request_image"), async (req, res) => {
    const response = await requestService.createrequest(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE REQUEST AMOUNT

router.post('/update-request',upload.single("request_image"), async (req, res) => {
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

// GET REQUEST AMOUNT BY NAME

router.post('/get-request-by-name', async (req, res) => {
    const response = await requestService.getrequestByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET REQUEST AMOUNT BY ID

router.post('/get-request-by-id', async (req, res) => {
    const response = await requestService.getrequestById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL REQUEST AMOUNTS
router.get('/get-all-requests', async (req, res) => {
    const response = await requestService.getAllrequests(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;