const notificationServices = require('../service/notification');
const route = require('express');
const router = route.Router();

// // CREATEnotification

router.post('/send-Notification', async (req, res) => {
    const response = await notificationServices.sendNotificationService(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})
router.post('/create-Notification', async (req, res) => {
    const response = await notificationServices.createNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// update notification

router.post('/update-Notification', async (req, res) => {
    const response = await notificationServices.updateNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE notification

router.post('/delete-Notification-by-id', async (req, res) => {
    const response = await notificationServices.deleteNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET notification

router.post('/get-Notification-by-id', async (req, res) => {
    const response = await notificationServices.getNotificationById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL notificationS 

router.get('/get-all-Notification', async (req, res) => {
    const response = await notificationServices.getAllNotification(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH notification DETAILS

router.post('/search-Notification', async (req, res) => {
    const response = await notificationServices.searchNotificationDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT

router.post('/count-Notification', async (req, res) => {
    const response = await notificationServices.countNotificationDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;