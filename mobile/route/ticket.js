const ticketService = require('../service/ticket');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/image/tickets")
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

// CREATE PRODUCT

router.post('/create-ticket', upload.single("issueImage"), async (req, res) => {
    const response = await ticketService.createTicket(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE PRODUCT

router.post('/update-ticket', upload.single("ticket_Image"), async (req, res) => {
    const response = await ticketService.updateTicket(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE PRODUCT BY ID

router.post('/delete-ticket-by-id', async (req, res) => {
    const response = await ticketService.deleteTicket(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET PRODUCT

router.post('/get-ticket-by-id', async (req, res) => {
    const response = await ticketService.getTicketById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PRODUCT 

router.get('/get-all-ticket', async (req, res) => {
    const response = await ticketService.getAllTicket(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-ticket-by-userid', async (req, res) => {
    const response = await ticketService.getAllTicketByUserID(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PRODUCT

router.post("/search-ticket-by-userid", async (req, res) => {
    let response = await ticketService.searchTicketDetailsByUserID(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});
router.post("/search-ticket", async (req, res) => {
    let response = await ticketService.searchTicketDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;