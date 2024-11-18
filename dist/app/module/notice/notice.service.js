"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const notice_constant_1 = require("./notice.constant");
const notice_model_1 = __importDefault(require("./notice.model"));
const createNotice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.create(payload);
    return result;
});
const getAllNotices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const noticeQuery = new QueryBuilder_1.default(notice_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(notice_constant_1.noticeSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery();
    const result = yield (noticeQuery === null || noticeQuery === void 0 ? void 0 : noticeQuery.queryModel);
    const total = yield notice_model_1.default.countDocuments(noticeQuery.queryModel.getFilter());
    return { data: result, total };
});
const getNoticeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findById(id);
    return result;
});
const deleteNoticeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const updateNoticeById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.noticeServices = {
    createNotice,
    getAllNotices,
    getNoticeById,
    deleteNoticeById,
    updateNoticeById,
};
