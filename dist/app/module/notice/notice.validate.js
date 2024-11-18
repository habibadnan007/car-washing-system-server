"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeZodSchema = void 0;
const zod_1 = require("zod");
const createNoticeZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.enum(['active', 'inactive']),
    priority: zod_1.z.enum(['medium', 'high', 'low']),
});
const updateNoticeZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
    priority: zod_1.z.enum(['medium', 'high', 'low']).optional(),
});
exports.noticeZodSchema = {
    createNoticeZodSchema,
    updateNoticeZodSchema,
};
