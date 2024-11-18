"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noticeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    priority: { type: String, enum: ['medium', 'high', 'low'], required: true },
}, { timestamps: true });
const Notice = (0, mongoose_1.model)('Notice', noticeSchema);
exports.default = Notice;
