"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMeta_1 = __importDefault(require("./getMeta"));
const sendResponse = (res, statusCode, format) => {
    var _a, _b;
    res.status(statusCode).send({
        success: format === null || format === void 0 ? void 0 : format.success,
        message: format === null || format === void 0 ? void 0 : format.message,
        data: (format === null || format === void 0 ? void 0 : format.data) || null,
        meta: (0, getMeta_1.default)((_a = format.meta) === null || _a === void 0 ? void 0 : _a.query, (_b = format.meta) === null || _b === void 0 ? void 0 : _b.total),
    });
};
exports.default = sendResponse;
