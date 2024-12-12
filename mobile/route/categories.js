const categoriesService = require('../service/categories');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage 
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/images/categories/")
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

// GET ALL  CATEGORIES 

router.get('/get-all-categories', async (req, res) => {
    const response = await categoriesService.getAllCategories(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// Pagination

router.post('/get-category-with-pagination', async (req, res) => {
    try {
        const {page = 1, limit = 8 } = req.body; // Default page = 1, limit = 8
        const response = await categoriesService.getCategorywithPagination(req);

        if (response.success) {
            res.json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.log("Error in /get-category-with-pagination route: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET  CATEGORIES

router.post('/get-categories-by-id', async (req, res) => {
    const response = await categoriesService.getCategoriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH  CATEGORIES

router.post("/search-categories", async (req, res) => {
    let response = await categoriesService.searchCategoriesDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;