const couponService = require('../service/coupons');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/coupons")
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

// UPDATE PRODUCT

router.post('/update-coupon', upload.single("coupon_Image"), async (req, res) => {
    const response = await couponService.updatecoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET PRODUCT

router.post('/get-coupon-by-id', async (req, res) => {
    const response = await couponService.getcouponById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PRODUCT 

router.get('/get-all-coupon', async (req, res) => {
    const response = await couponService.getAllCoupon(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PRODUCT

router.post("/search-coupon", async (req, res) => {
    let response = await couponService.searchCouponDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;