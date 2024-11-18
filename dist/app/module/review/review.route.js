"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const review_validate_1 = require("./review.validate");
const router = (0, express_1.Router)();
exports.reviewRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(review_validate_1.reviewZodSchema.createReviewZodSchema), review_controller_1.reviewControllers.createReview);
router.get('/', review_controller_1.reviewControllers.getAllReview);
router.get('/average-rating', review_controller_1.reviewControllers.getAverageRating);
