const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductById, getAllProduct, searchProductDetails, bulkProductUpload } = require('../service/product');
const router = express.Router();
const multer = require('multer')
const path = require('path')

// Configure multer for memory storage
var upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000000000  // Set your max file size here
    }
});

// Route for creating a product and uploading to Google Cloud Storage
router.post('/create-product', upload.single('productImage'), async (req, res) => {
    try {
        const response = await createProduct(req);
        if (response.success) {
            res.json(response) 
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.log("create product error : ", error)
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

router.post('/update-product', upload.single('productImage'), async (req, res) => {
    const response = await updateProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.delete('/delete-product', async (req, res) => {
    const response = await deleteProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
}); 

router.post('/get-product-by-id', async (req, res) => {
    const response = await getProductById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-product', async (req, res) => {
    const response = await getAllProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/search-product', async (req, res) => {
    const response = await searchProductDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// router.post('/bulkUpload', upload.single('csv_file'), async (req, res) => {
//     const response = await bulkProductUpload(req);
//     if (response.success) {
//         res.json(response)
//     } else {
//         res.status(500).json(response);
//     }
// });

module.exports = router;
