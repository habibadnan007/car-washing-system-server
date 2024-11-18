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
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const createUser = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isExistUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This email is already exist!');
    }
    // file upload
    if (file === null || file === void 0 ? void 0 : file.path) {
        const cloudinaryRes = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`${payload.name}-${Date.now()}`, file.path);
        if (cloudinaryRes === null || cloudinaryRes === void 0 ? void 0 : cloudinaryRes.secure_url) {
            payload.img = cloudinaryRes.secure_url;
        }
    }
    const result = yield user_model_1.default.create(payload);
    return result;
});
const signinUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is not found');
    }
    const decryptPass = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!decryptPass) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password is not match');
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        img: user.img,
        address: user.address,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return {
        accessToken,
        refreshToken,
        data: user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    }
    catch (e) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    const { email } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted !');
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        img: user.role,
        address: user.address,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    return {
        accessToken,
    };
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(user_constant_1.userSearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery();
    const result = yield userQuery.queryModel;
    const total = yield user_model_1.default.countDocuments(userQuery.queryModel.getFilter());
    return { data: result, total };
});
const toggleUserRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById({ _id: id });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is not found!');
    }
    user.role = user.role === 'admin' ? 'user' : 'admin';
    yield user.save();
    return user;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return user;
});
const updateProfile = (id, file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // file upload
    if (file === null || file === void 0 ? void 0 : file.path) {
        const cloudinaryRes = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`${payload.name}-${Date.now()}`, file.path);
        if (cloudinaryRes === null || cloudinaryRes === void 0 ? void 0 : cloudinaryRes.secure_url) {
            payload.img = cloudinaryRes.secure_url;
        }
    }
    const result = yield user_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found!');
    }
    const decryptPass = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!decryptPass) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password is not match');
    }
    const hashedPass = yield bcrypt_1.default.hash(payload.newPassword, Number(process.env.SALT_ROUNDS));
    const result = yield user_model_1.default.findByIdAndUpdate(id, { password: hashedPass }, { new: true }).select('-password');
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update password.');
    }
    return result;
});
exports.userServices = {
    createUser,
    signinUser,
    getAllUser,
    refreshToken,
    deleteUserById,
    toggleUserRoleById,
    updateProfile,
    changePassword,
};
