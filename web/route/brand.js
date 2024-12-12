const brandsService = require('../service/brand');
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

// CREATE  Brands

router.post('/create-brands', upload.single('brandImage'), async (req, res) => {
    const response = await brandsService.createBrands(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response); 
    }
})

// UPDATE  Brands

router.post('/update-brands',upload.single('brandImage'), async (req, res) => {
    const response = await brandsService.updateBrands(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// DELETE  Brands

router.post('/delete-brands-by-id', async (req, res) => {
    const response = await brandsService.deleteBrands(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET  Brands

router.post('/get-brands-by-id', async (req, res) => {
    const response = await brandsService.getBrandsById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL  Brands 

router.get('/get-all-brands', async (req, res) => {
    const response = await brandsService.getAllBrands(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH  Brands

router.post("/search-brands", async (req, res) => {
    let response = await brandsService.searchBrandsDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;