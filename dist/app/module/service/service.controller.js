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
exports.serviceControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_service_1 = require("./service.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_service_1.serviceServices.createService(req.file, req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Service is created successfully!',
        data: service,
    });
}));
const getAllService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, total } = yield service_service_1.serviceServices.getAllService(req.query);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Services retrieved successfully!',
        data,
        meta: { query: req.query, total },
    });
}));
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const service = yield service_service_1.serviceServices.getServiceById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!service) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Service retrieved successfully!',
        data: service,
    });
}));
const deleteServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const service = yield service_service_1.serviceServices.deleteServiceById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    if (!service) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Service is deleted successfully!',
        data: service,
    });
    return service;
}));
const updateServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const service = yield service_service_1.serviceServices.updateServiceById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id, req.file, req.body);
    if (!service) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Service is updated successfully!',
        data: service,
    });
}));
exports.serviceControllers = {
    createService,
    getAllService,
    getServiceById,
    deleteServiceById,
    updateServiceById,
};
