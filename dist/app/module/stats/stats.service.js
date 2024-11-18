"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsService = void 0;
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_model_1.default.countDocuments();
    const totalServices = yield service_model_1.default.countDocuments();
    const totalSlots = yield slot_model_1.default.countDocuments();
    // Fetch upcoming slots (slots with a date later than the current time)
    const upcomingSlots = yield slot_model_1.default.countDocuments({
        date: { $gte: new Date() },
    });
    // Fetch available slots (slots that are not booked)
    const availableSlots = yield slot_model_1.default.countDocuments({
        isBooked: 'available',
    });
    // Fetch the total number of bookings
    const totalBookings = yield booking_model_1.default.countDocuments();
    return {
        totalUsers,
        totalServices,
        totalSlots,
        availableSlots,
        upcomingSlots,
        totalBookings,
    };
});
const getUserStats = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const totalServices = yield service_model_1.default.countDocuments();
    // Fetch upcoming slots (slots with a date later than the current time)
    const upcomingSlots = yield slot_model_1.default.countDocuments({
        date: { $gte: new Date() },
    });
    const availableSlots = yield slot_model_1.default.find({
        isBooked: 'available',
    }).countDocuments();
    // Fetch the total number of bookings
    const totalBookings = yield booking_model_1.default.find({
        customer: payload === null || payload === void 0 ? void 0 : payload.customer,
    }).countDocuments();
    // Fetch the total number of upcoming bookings
    const upcomingBookings = yield booking_model_1.default.find({
        customer: payload === null || payload === void 0 ? void 0 : payload.customer,
        date: { $gte: new Date() },
    }).countDocuments();
    return {
        totalServices,
        availableSlots,
        upcomingSlots,
        totalBookings,
        upcomingBookings,
    };
});
exports.statsService = {
    getAdminStats,
    getUserStats,
};
