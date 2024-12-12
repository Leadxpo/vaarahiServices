const adminService = require('../service/adminStaff');
const route = require('express');
const router = route.Router();

const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/StaffDP")
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


router.post('/create-admin', async (req, res) => {
    const response = await adminService.createAdmin(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// LOGIN 

router.post('/login-admin', async (req, res) => {
    const response = await adminService.adminLogin(req.body);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response); 
    }
});

// UPDATE admin

router.post('/update-admin',async (req, res) => {
    const response = await adminService.updateAdmin(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE admin

router.post('/delete-admin-by-id', async (req, res) => {
    const response = await adminService.deleteAdmin(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET admin

router.post('/get-admin-by-id', async (req, res) => {
    const response = await adminService.getAdminById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL adminS 

router.get('/get-all-admin', async (req, res) => {
    const response = await adminService.getAllAdmin(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH admin DETAILS

router.post('/search-admin', async (req, res) => {
    const response = await adminService.searchAdminDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.get('/count-admin', async (req, res) => {
    const response = await adminService.countAdminDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// LOGGED

router.post("/get-logged-in-admin-details", async (req, res) => {
    let response = await adminService.getLoginAdminDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// REFRESH TOKEN

router.get("/refresh-token", async (req, res) => {
    let response = await adminService.generateAccessTokenUsingRefreshToken(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// RESET PASSWORD

router.post("/reset-password", async (req, res) => {
    let response = await adminService.resetPassword(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;