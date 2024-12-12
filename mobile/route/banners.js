const bannerService = require('../service/banners');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/banners")
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

// CREATE BANNER

router.post('/create-banner',upload.single("banner_image"), async (req, res) => {
    const response = await bannerService.createBanner(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BANNER

router.post('/update-banner',upload.single("banner_image"), async (req, res) => {
    const response = await bannerService.updateBanner(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BANNER

router.post('/delete-banner', async (req, res) => {
    const response = await bannerService.deleteBanner(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET BANNER BY NAME

router.post('/get-banner-by-name', async (req, res) => {
    const response = await bannerService.getBannerByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET BANNER BY ID

router.post('/get-banner-by-id', async (req, res) => {
    const response = await bannerService.getBannerById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BANNERS
router.get('/get-allBanners', async (req, res) => {
    const response = await bannerService.getAllBanners(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;