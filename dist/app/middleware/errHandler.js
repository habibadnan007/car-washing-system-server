"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrHandler = exports.notFoundErrHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const handleZodErr_1 = __importDefault(require("../errors/handleZodErr"));
const handleMongooseErr_1 = require("../errors/handleMongooseErr");
const notFoundErrHandler = (req, res, next) => {
    // const error = new Error(`Not Found - ${req.originalUrl}`)
    const statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    res
        .status(statusCode)
        .send({ success: false, statusCode, message: 'Not Found' });
};
exports.notFoundErrHandler = notFoundErrHandler;
const globalErrHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Internal Server Error';
    let errorMessages = [
        {
            path: '',
            message: 'Internal Server Error',
        },
    ];
    // zod err
    if (err instanceof zod_1.ZodError) {
        const myErr = (0, handleZodErr_1.default)(err);
        statusCode = myErr.statusCode;
        message = myErr.message;
        errorMessages = myErr.errorMessages;
    }
    // Cast err
    if (err instanceof mongoose_1.default.Error.CastError) {
        const myErr = (0, handleMongooseErr_1.handleMongooseCastErr)(err);
        statusCode = myErr.statusCode;
        message = myErr.message;
        errorMessages = myErr.errorMessages;
    }
    // validation err
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const myErr = (0, handleMongooseErr_1.handleMongooseValidationErr)(err);
        statusCode = myErr.statusCode;
        message = myErr.message;
        errorMessages = myErr.errorMessages;
    }
    // Cast err
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const myErr = (0, handleMongooseErr_1.handleMongooseDuplicateKeyErr)(err);
        statusCode = myErr.statusCode;
        message = myErr.message;
        errorMessages = myErr.errorMessages;
    }
    res.status(statusCode).send({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err === null || err === void 0 ? void 0 : err.stack,
        // err,
    });
};
exports.globalErrHandler = globalErrHandler;
