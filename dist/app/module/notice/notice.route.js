"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouter = void 0;
const express_1 = require("express");
const notice_controller_1 = require("./notice.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const notice_validate_1 = require("./notice.validate");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.noticeRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, zodValidateHandler_1.default)(notice_validate_1.noticeZodSchema.createNoticeZodSchema), notice_controller_1.noticeControllers.createNotice); // Only accessible by admin
router.get('/', notice_controller_1.noticeControllers.getAllNotices);
router.get('/:id', notice_controller_1.noticeControllers.getNoticeById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), notice_controller_1.noticeControllers.deleteNoticeById); // Only accessible by admin
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, zodValidateHandler_1.default)(notice_validate_1.noticeZodSchema.updateNoticeZodSchema), notice_controller_1.noticeControllers.updateNoticeById); // Only accessible by admin
