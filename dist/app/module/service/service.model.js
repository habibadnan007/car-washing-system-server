"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const Service = (0, mongoose_1.model)('Service', serviceSchema);
exports.default = Service;
