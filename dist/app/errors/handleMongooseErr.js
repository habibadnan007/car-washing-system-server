"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseDuplicateKeyErr = exports.handleMongooseCastErr = exports.handleMongooseValidationErr = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleMongooseValidationErr = (err) => {
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    const message = 'Validation Error';
    const errorMessages = Object.keys(err.errors).map((key) => {
        var _a;
        return {
            path: key,
            message: (_a = err.errors[key]) === null || _a === void 0 ? void 0 : _a.message,
        };
    });
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.handleMongooseValidationErr = handleMongooseValidationErr;
const handleMongooseCastErr = (err) => {
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    const message = 'Cast Error';
    const errorMessages = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        },
    ];
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.handleMongooseCastErr = handleMongooseCastErr;
const handleMongooseDuplicateKeyErr = (err) => {
    var _a, _b;
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    const message = 'Duplicate Entry';
    const errorMessages = [
        {
            path: (_a = Object.keys(err.keyValue)) === null || _a === void 0 ? void 0 : _a[0],
            message: `${(_b = Object.values(err.keyValue)) === null || _b === void 0 ? void 0 : _b[0]} is already exist!`,
        },
    ];
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.handleMongooseDuplicateKeyErr = handleMongooseDuplicateKeyErr;
