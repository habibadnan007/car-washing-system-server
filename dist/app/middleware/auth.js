"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const auth = (...userRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => {
        var _a, _b;
        const bearerToken = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b[1];
        if (!bearerToken) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route');
        }
        const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.JWT_ACCESS_SECRET);
        if (!decoded) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You have no access to this route');
        }
        if ((userRoles === null || userRoles === void 0 ? void 0 : userRoles.length) &&
            !userRoles.includes(decoded.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You have no access to this route');
        }
        req.user = decoded;
        // console.log(user)
        next();
    });
};
exports.default = auth;
