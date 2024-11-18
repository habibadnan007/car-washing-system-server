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
exports.noticeControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const notice_service_1 = require("./notice.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield notice_service_1.noticeServices.createNotice(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Notice is created successfully!',
        data: notice,
    });
}));
const getAllNotices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, total } = yield notice_service_1.noticeServices.getAllNotices(req.query);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Notices retrieved successfully!',
        data,
        meta: { query: req.query, total },
    });
}));
const getNoticeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const notice = yield notice_service_1.noticeServices.getNoticeById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!notice) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Notice not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Notice retrieved successfully!',
        data: notice,
    });
}));
const deleteNoticeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const notice = yield notice_service_1.noticeServices.deleteNoticeById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    if (!notice) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Notice not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Notice is deleted successfully!',
        data: notice,
    });
    return notice;
}));
const updateNoticeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const notice = yield notice_service_1.noticeServices.updateNoticeById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id, req.body);
    if (!notice) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Notice not found');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Notice is updated successfully!',
        data: notice,
    });
}));
exports.noticeControllers = {
    createNotice,
    getAllNotices,
    getNoticeById,
    deleteNoticeById,
    updateNoticeById,
};
