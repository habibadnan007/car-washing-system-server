"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRouter = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.slotRouter = router;
router.get('/', slot_controller_1.slotsControllers.getAllSlots);
router.get('/:id', slot_controller_1.slotsControllers.getSlotById);
router.get('/availability', slot_controller_1.slotsControllers.getAvailableSlots);
router.patch('/toggle-status/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), slot_controller_1.slotsControllers.toggleSlotStatus);
