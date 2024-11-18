"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_route_1 = require("../module/service/service.route");
const slot_route_1 = require("../module/slot/slot.route");
const booking_route_1 = require("../module/booking/booking.route");
const user_route_1 = require("../module/user/user.route");
const stats_route_1 = require("../module/stats/stats.route");
const payment_route_1 = require("../module/payment/payment.route");
const upload_route_1 = require("../module/upload/upload.route");
const review_route_1 = require("../module/review/review.route");
const notice_route_1 = require("../module/notice/notice.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/services',
        route: service_route_1.serviceRouter,
    },
    {
        path: '/slots',
        route: slot_route_1.slotRouter,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRouter,
    },
    {
        path: '/auth',
        route: user_route_1.userRouter,
    },
    {
        path: '/payment',
        route: payment_route_1.paymentRouter,
    },
    {
        path: '/upload',
        route: upload_route_1.uploadRouter,
    },
    {
        path: '/stats',
        route: stats_route_1.statsRouter,
    },
    {
        path: '/review',
        route: review_route_1.reviewRouter,
    },
    {
        path: '/notice',
        route: notice_route_1.noticeRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
