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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("./slot.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const slot_constant_1 = require("./slot.constant");
const createSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = payload || {}, { service, startTime, endTime, date } = _a, restSlotProps = __rest(_a, ["service", "startTime", "endTime", "date"]);
    // Validate if the date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of today for accurate comparison
    const slotDate = new Date(date); // Parse the ISO 8601 date
    if (slotDate < today) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'The date cannot be in the past!');
    }
    // Validation: Check if endTime is greater than startTime
    const startTimeToMin = Number(startTime === null || startTime === void 0 ? void 0 : startTime.split(':')[0]) * 60 + Number(startTime === null || startTime === void 0 ? void 0 : startTime.split(':')[1]);
    const endTimeToMin = Number(endTime === null || endTime === void 0 ? void 0 : endTime.split(':')[0]) * 60 + Number(endTime === null || endTime === void 0 ? void 0 : endTime.split(':')[1]);
    if (endTimeToMin <= startTimeToMin) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'End time must be later than start time!');
    }
    const isExistService = yield service_model_1.default.findById(service);
    if (!isExistService) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service is not found!');
    }
    if (isExistService.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Service is deleted!');
    }
    const slots = [];
    const serviceDuration = isExistService === null || isExistService === void 0 ? void 0 : isExistService.duration;
    for (let time = startTimeToMin; time < endTimeToMin; time += serviceDuration) {
        const slotStartTime = `${Math.floor(time / 60)
            .toString()
            .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
        const slotEndTime = `${Math.floor((time + serviceDuration) / 60)
            .toString()
            .padStart(2, '0')}:${((time + serviceDuration) % 60).toString().padStart(2, '0')}`;
        const slot = new slot_model_1.default(Object.assign({ startTime: slotStartTime, endTime: slotEndTime, service,
            date }, restSlotProps));
        slots.push(slot);
        yield slot.save();
    }
    return slots;
});
const getAllSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpcoming = query.upcoming;
    delete query.upcoming;
    const slotsQuery = new QueryBuilder_1.default(slot_model_1.default.find(), Object.assign({}, query))
        .searchQuery(slot_constant_1.slotSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'service',
        },
    ]);
    if (isUpcoming) {
        const currentTimestamp = new Date().getTime(); // Get current time as a timestamp
        slotsQuery.queryModel = slotsQuery.queryModel
            .where('date')
            .gte(currentTimestamp);
    }
    const result = yield (slotsQuery === null || slotsQuery === void 0 ? void 0 : slotsQuery.queryModel.exec());
    const total = yield slot_model_1.default.countDocuments(slotsQuery.queryModel.getFilter());
    return { data: result, total };
});
const getAvailableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpcoming = query.upcoming;
    delete query.upcoming;
    const slotsQuery = new QueryBuilder_1.default(slot_model_1.default.find(), Object.assign(Object.assign({}, query), { isBooked: 'available' }))
        .searchQuery([])
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'service',
        },
    ]);
    if (isUpcoming) {
        const currentTimestamp = new Date().getTime(); // Get current time as a timestamp
        slotsQuery.queryModel = slotsQuery.queryModel
            .where('date')
            .gte(currentTimestamp);
    }
    const result = yield (slotsQuery === null || slotsQuery === void 0 ? void 0 : slotsQuery.queryModel.exec());
    const total = yield slot_model_1.default.countDocuments(slotsQuery.queryModel.getFilter());
    return { data: result, total };
});
const toggleSlotStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const slot = yield slot_model_1.default.findById(id);
    if (!slot) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Slot is not found!');
    }
    if (slot.isBooked === 'booked') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Slot is already booked!');
    }
    slot.isBooked = slot.isBooked === 'available' ? 'canceled' : 'available';
    yield slot.save();
    return slot;
});
const getSlotById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.default.findById(id).populate('service');
    return result;
});
exports.slotServices = {
    createSlot,
    getAvailableSlots,
    getAllSlots,
    getSlotById,
    toggleSlotStatus,
};
