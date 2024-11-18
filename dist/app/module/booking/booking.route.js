"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const booking_validate_1 = require("./booking.validate");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.bookingRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, zodValidateHandler_1.default)(booking_validate_1.bookingZodSchema.createBookingZodSchema), booking_controller_1.bookingControllers.createBooking); //TODO: only accessible by user
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getAllBookings); //TODO: only accessible by admin
router.get('/my-bookings', (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingControllers.getMyBookings); //TODO: only accessible by user
