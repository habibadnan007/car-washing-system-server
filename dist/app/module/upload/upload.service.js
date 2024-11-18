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
exports.uploadServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const axios_1 = __importDefault(require("axios"));
const initUpload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.VITE_IMGBB_API_KEY}`;
        const res = yield axios_1.default.post(apiUrl, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 60000 // Set a timeout (e.g., 60 seconds) if necessary
        });
        console.log(res.data, 'Response after upload');
        if (res.data && res.data.success) {
            return res.data;
        }
        else {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Upload failed');
        }
    }
    catch (error) {
        console.error('Upload Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message || 'Unknown error');
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'An error occurred during the upload process!');
    }
});
exports.uploadServices = {
    initUpload,
};
