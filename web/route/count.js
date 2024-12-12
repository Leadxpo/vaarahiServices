const countService = require('../service/counts');
const route = require('express');
const router = route.Router();


// CREATE Count

router.get('/allCount', async (req, res) => {
    const response = await countService.getallCounts(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


module.exports = router;