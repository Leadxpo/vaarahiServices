const promoService = require('../service/promo');
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

// CREATE BANNER

router.post('/create-promo',upload.single("promo_image"), async (req, res) => {
    const response = await promoService.createPromo(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BANNER

router.post('/update-promo',upload.single("promo_image"), async (req, res) => {
    const response = await promoService.updatePromo(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BANNER

router.post('/delete-promo', async (req, res) => {
    const response = await promoService.deletePromo(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET BANNER BY NAME

router.post('/get-promo-by-name', async (req, res) => {
    const response = await promoService.getPromoByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET BANNER BY ID

router.post('/get-promo-by-id', async (req, res) => {
    const response = await promoService.getPromoById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BANNERS
router.get('/get-all-promos', async (req, res) => {
    const response = await promoService.getAllPromos(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;