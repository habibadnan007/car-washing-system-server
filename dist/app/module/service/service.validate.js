"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceZodSchema = void 0;
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    duration: zod_1.z.number(),
    isFeatured: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const updateServiceZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    duration: zod_1.z.number().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.serviceZodSchema = {
    createServiceZodSchema,
    updateServiceZodSchema,
};
