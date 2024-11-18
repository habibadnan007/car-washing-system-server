"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const upload_controller_1 = require("./upload.controller");
const router = (0, express_1.Router)();
exports.uploadRouter = router;
router.post('/', upload_controller_1.uploadControllers.initUpload);
