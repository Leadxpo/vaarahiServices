const express = require('express');
const { getProductsByCategorywithPagination, updateProduct, getProductById,getProductByWishlist, getAllProduct, searchProductDetails } = require('../service/product');

const router = express.Router();
//IMAGE CONFRIGATIONS


router.post('/update-product', async (req, res) => {
    const response = await updateProduct(req);
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

router.post('/get-product-by-wishlist', async (req, res) => {
    const response = await getProductByWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// pagination 

router.post('/get-products-by-category-with-pagination', async (req, res) => {
    try {
        const { category, page = 1, limit = 20 } = req.body; // Default page = 1, limit = 20
        const response = await getProductsByCategorywithPagination(req);

        if (response.success) {
            res.json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        console.log("Error in /get-products-by-category-with-pagination route: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
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
