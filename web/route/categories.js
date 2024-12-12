const categoriesService = require('../service/categories');
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

// CREATE  CATEGORIES

router.post('/create-categories', upload.single('categoryImage'),async (req, res) => {
    try {
        const response = await categoriesService.createCategories(req);
        if (response.success) {
            res.json(response)
        } else {
            res.status(500).json(response);
        }
        } catch (error) {
            console.log("create category error : ", error)
            res.status(500).json({ success: false, message: "Internal server error." });    
    }
})

// UPDATE  CATEGORIES

router.post('/update-categories',upload.single('categoryImage'), async (req, res) => {
    const response = await categoriesService.updateCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// DELETE  CATEGORIES

router.post('/delete-categories-by-id', async (req, res) => {
    const response = await categoriesService.deleteCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
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

// GET ALL  CATEGORIES 

router.get('/get-all-categories', async (req, res) => {
    const response = await categoriesService.getAllCategories(req);
    if (response) {
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