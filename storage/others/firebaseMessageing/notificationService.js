const admin = require("./firbaseMessages")

class NotificationService {
    static async sendNotification(deviceToken, title, body) {
        console.log(" deviceToken", deviceToken)
        console.log(" title",  title)
        console.log(" body", body)
        const message = {
            notification: {
                title: title,
                body: body
            },
            token: deviceToken // Replace with the token received from the frontend
        };
        const messaging = admin.messaging();
        messaging.send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
                return response;
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });


    }
}

module.exports= NotificationService;