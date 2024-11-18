"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const user_validate_1 = require("./user.validate");
const user_service_1 = require("./user.service");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/signup', uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.createUserZodSchema), user_controller_1.userControllers.createUser);
router.post('/login', (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.signinUserZodSchema), user_controller_1.userControllers.signinUser);
router.post('/refresh-token', user_service_1.userServices.refreshToken);
router.get('/users', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.getAllUser);
router.delete('/users/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.deleteUserById);
router.patch('/users/toggle-role/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.toggleUserRoleById);
router.patch('/users/edit-profile/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.editProfileZodSchema), user_controller_1.userControllers.updateProfile);
router.patch('/users/edit-password/:id', (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.editPasswordZodSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.changePassword);
