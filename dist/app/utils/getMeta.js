"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMeta = (query, total) => {
    const page = (query === null || query === void 0 ? void 0 : query.page) ? Number(query.page) : 1;
    const limit = (query === null || query === void 0 ? void 0 : query.limit) ? Number(query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    return { total, page, totalPage, limit };
};
exports.default = getMeta;
