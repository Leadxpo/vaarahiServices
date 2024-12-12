require('dotenv').config();
const express = require("express")
const { createtable } = require('./db')
const http = require('http')
const path = require('path')
const { Server } = require("socket.io");

// FOR WEB

const address_web = require('./web/route/address')
const user_web = require('./web/route/users')
const notification_web = require('./web/route/notification')
const review_web = require('./web/route/review')
const deliveryStaff_web = require('./web/route/deliverStaff')
const admin_web = require('./web/route/adminStaff')
const categories_web = require('./web/route/categories')
const brand_web = require('./web/route/brand')
const orders_web = require('./web/route/orders')
const product_web = require('./web/route/product')
const recentOrders_web = require('./web/route/recentOrders')
const cart_web = require('./web/route/cart')
const wishlist_web = require('./web/route/wishlist')
const promo_web = require('./web/route/promo')
const banner_web = require('./web/route/banners')
const request_web = require('./web/route/request')
const coupons_web = require('./web/route/coupons')
const ticket_web = require('./web/route/ticket')
const count_web = require('./web/route/count')
const usersRemoveRequest_web = require('./web/route/usersRemoveRequest')

const address_mob = require('./mobile/route/address')
const user_mob = require('./mobile/route/users')
const notification_mob = require('./mobile/route/notification')
const review_mob = require('./mobile/route/review')
const deliveryStaff_mob = require('./mobile/route/deliverStaff')
const admin_mob = require('./mobile/route/adminStaff')
const categories_mob = require('./mobile/route/categories')
const brand_mob = require('./mobile/route/brand')
const orders_mob = require('./mobile/route/orders')
const product_mob = require('./mobile/route/product')
const recentOrders_mob = require('./mobile/route/recentOrders')
const cart_mob = require('./mobile/route/cart')
const wishlist_mob = require('./mobile/route/wishlist')
const promo_mob = require('./mobile/route/promo')
const banner_mob = require('./mobile/route/banners')
const request_mob = require('./mobile/route/request')
const coupons_mob = require('./mobile/route/coupons')
const ticket_mob = require('./mobile/route/ticket')
const count_mob = require('./mobile/route/count')
const usersRemoveRequest_mob = require('./mobile/route/usersRemoveRequest')

var cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const { create } = require('domain');

const createtable1 = () => {
    try {
        createtable();
    }
    catch (error) {
        console.log("error", error)
    }
}
createtable1()

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ limit: '100mb', extended: 'true' }))
app.use(bodyparser.json({ limit: '100mb' }))
app.use('/storage', express.static(path.join(__dirname, 'storage'), {
    setHeaders: (res, path) => {
        console.log(`Serving ${path}`);
    }
}));
// web
app.use('/web/count', count_web)
app.use('/web/address', address_web)
app.use('/web/user', user_web)
app.use('/web/notification', notification_web)
app.use('/web/review', review_web)
app.use('/web/admin', admin_web)
app.use('/web/deliveryStaff', deliveryStaff_web)
app.use('/web/categories', categories_web)
app.use('/web/brand', brand_web)
app.use('/web/orders', orders_web)
app.use('/web/product', product_web)
app.use('/web/recentOrders', recentOrders_web)
app.use('/web/cart', cart_web)
app.use('/web/wishlist', wishlist_web)
app.use('/web/promo', promo_web)
app.use('/web/banner', banner_web)
app.use('/web/request', request_web)
app.use('/web/coupons', coupons_web)
app.use('/web/ticket', ticket_web)
app.use('/web/usersRemoveRequest', usersRemoveRequest_web)

// Mobile

app.use('/mob/count', count_mob)
app.use('/mob/address', address_mob)
app.use('/mob/user', user_mob)
app.use('/mob/notification', notification_mob)
app.use('/mob/review', review_mob)
app.use('/mob/admin', admin_mob)
app.use('/mob/deliveryStaff', deliveryStaff_mob)
app.use('/mob/categories', categories_mob)
app.use('/mob/brand', brand_mob)
app.use('/mob/orders', orders_mob)
app.use('/mob/product', product_mob)
app.use('/mob/recentOrders', recentOrders_mob)
app.use('/mob/cart', cart_mob)
app.use('/mob/wishlist', wishlist_mob)
app.use('/mob/promo', promo_mob)
app.use('/mob/banner', banner_mob)
app.use('/mob/request', request_mob)
app.use('/mob/coupons', coupons_mob)
app.use('/mob/ticket', ticket_mob)
app.use('/mob/usersRemoveRequest', usersRemoveRequest_mob) 


const port = 3000 || process.env.appport
const server = http.createServer(app)
const io = new Server(server);
server.listen(port, () => {
    console.log("servar is running at port", +port)
});