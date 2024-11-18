"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewZodSchema = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    user: zod_1.z.string(),
    rating: zod_1.z.number(),
    feedback: zod_1.z.string(),
});
exports.reviewZodSchema = {
    createReviewZodSchema,
};
