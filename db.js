const { Sequelize, Model } = require('sequelize')
const adderssModel = require('./model/address')
const userModel = require('./model/users')
const deliveryStaffModel = require('./model/deliveryStaff')
const adminStaffModel = require('./model/adminStaff')
const categoriesModel = require('./model/categories')
const brandModel = require('./model/brand')
const ordersModel = require('./model/orders')
const productModel = require('./model/product')
const recentOrdersModel = require('./model/recentOrders')
const cartModel = require('./model/cart')
const wishlistModel = require('./model/wishlist')
const bannerModel = require('./model/banner')
const promoModel = require('./model/promo')
const requestModel = require('./model/request')
const couponsModel = require('./model/coupons')
const ticketModel = require('./model/tickets')
const notificationModel = require('./model/notification')
const reviewModel = require('./model/review')
const userRemoveRequestModel = require('./model/userRemoveRequest')


const sequelize = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_PROVIDER,
    }
)

const adderss = adderssModel(sequelize)
const user = userModel(sequelize)
const notification = notificationModel(sequelize)
const review = reviewModel(sequelize)
const deliveryStaff = deliveryStaffModel(sequelize)
const adminStaff = adminStaffModel(sequelize)
const categories = categoriesModel(sequelize)
const brand = brandModel(sequelize)
const orders = ordersModel(sequelize)
const product = productModel(sequelize)
const recentOrders = recentOrdersModel(sequelize)
const cart = cartModel(sequelize)
const wishlist = wishlistModel(sequelize)
const banner = bannerModel(sequelize)
const promo = promoModel(sequelize)
const request = requestModel(sequelize)
const coupons = couponsModel(sequelize)
const ticket = ticketModel(sequelize)
const userRemoveRequests = userRemoveRequestModel(sequelize)


const createtable = () => {
    try {
        sequelize.authenticate();

        adderss.sync({ alter: false });
        user.sync({ alter: false }) 
        notification.sync({ alter: false })
        review.sync({ alter: false })
        deliveryStaff.sync({ alter: false })
        adminStaff.sync({ alter: false })
        categories.sync({ alter: false })
        brand.sync({ alter: false })
        orders.sync({ alter: false })
        product.sync({ alter: false})
        recentOrders.sync({ alter: false })
        cart.sync({ alter: false })
        wishlist.sync({ alter: false })
        banner.sync({ alter: false })
        promo.sync({ alter: false })
        request.sync({ alter: false })
        coupons.sync({ alter: false })
        ticket.sync({ alter: false }) 
        userRemoveRequests.sync({ alter: false }) 

        console.log("table created successfully") 

    }
    catch (error) {
        console.log("error" + error) 
    }
}

module.exports = { sequelize, createtable} 