const addressService = require('../service/address');
const route = require('express');
const router = route.Router();

// CREATE address

router.post('/create-address', async (req, res) => {
    const response = await addressService.createAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE address

router.post('/update-address',async (req, res) => {
    const response = await addressService.updateAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE address

router.post('/delete-address', async (req, res) => {
    const response = await addressService.deleteAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET address BY NAME

router.post('/get-address-by-name', async (req, res) => {
    const response = await addressService.getAddressByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET address BY ID

router.post('/get-address-by-userId', async (req, res) => {
    const response = await addressService.getAddressById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL addressS
router.get('/get-allAddresss', async (req, res) => {
    const response = await addressService.getAllAddresss(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;