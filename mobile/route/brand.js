const brandsService = require('../service/brand');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/brands/")
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
// GET ALL  Brands 

router.get('/get-all-brands', async (req, res) => {
    const response = await brandsService.getAllBrands(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// Pagination

router.post('/get-brand-with-pagination', async (req, res) => {
    try {
        const {page = 1, limit = 6 } = req.body; // Default page = 1, limit = 6
        const response = await brandsService.getBrandwithPagination(req);

        if (response.success) {
            res.json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.log("Error in /get-products-by-category route: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
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