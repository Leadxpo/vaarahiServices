const staffService = require('../service/deliveryStaff');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/staffDP") //storage\images\staffDP
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
// CREATE admin

// CREATE staff

router.post('/create-Staff',upload.single("staff_dp"), async (req, res) => {
    const response = await staffService.createStaff(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// LOGIN 

router.post('/login-Staff', async (req, res) => {
    const response = await staffService.staffLogin(req.body);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// UPDATE staff

router.post('/update-Staff',upload.single("staff_dp"),async (req, res) => {
    const response = await staffService.updateStaff(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE staff

router.post('/delete-Staff-by-id', async (req, res) => {
    const response = await staffService.deleteStaff(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET staff

router.post('/get-Staff-by-id', async (req, res) => {
    const response = await staffService.getStaffById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL staffS 

router.get('/get-all-Staff', async (req, res) => {
    const response = await staffService.getAllStaff(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH staff DETAILS

router.post('/search-Staff', async (req, res) => {
    const response = await staffService.searchStaffDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.get('/count-Staff', async (req, res) => {
    const response = await staffService.countStaffDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// REFRESH TOKEN

router.get("/refresh-token", async (req, res) => {
    let response = await staffService.generateAccessTokenUsingRefreshToken(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// RESET PASSWORD

router.post("/reset-password", async (req, res) => {
    let response = await staffService.resetPassword(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;