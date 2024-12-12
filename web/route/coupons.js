const couponService = require('../service/coupons');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

var upload = multer(
    {
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1000000000
        }
    }
);

// CREATE PRODUCT

router.post('/create-coupon', upload.single("coupon_Image"), async (req, res) => {
    const response = await couponService.createCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE PRODUCT

router.post('/update-coupon', upload.single("coupon_Image"), async (req, res) => {
    const response = await couponService.updateCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE PRODUCT BY ID

router.post('/delete-coupon-by-id', async (req, res) => {
    const response = await couponService.deleteCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET PRODUCT

router.post('/get-coupon-by-id', async (req, res) => {
    const response = await couponService.getCouponById(req);
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
    let response = await couponService.searchcouponDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;