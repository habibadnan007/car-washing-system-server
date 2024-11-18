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
exports.reviewServices = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.create(payload);
    return result;
});
const getAllReview = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewQuery = new QueryBuilder_1.default(review_model_1.default.find(), Object.assign({}, query))
        .searchQuery([])
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'user',
        },
    ]);
    const result = yield (reviewQuery === null || reviewQuery === void 0 ? void 0 : reviewQuery.queryModel);
    const total = yield review_model_1.default.countDocuments(reviewQuery.queryModel.getFilter());
    return { data: result, total };
});
const getAverageRating = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield review_model_1.default.aggregate([
        { $match: query }, // Filter reviews based on the query
        { $group: { _id: null, averageRating: { $avg: '$rating' } } }, // Calculate the average rating
    ]);
    return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.averageRating) || 0;
});
exports.reviewServices = {
    createReview,
    getAllReview,
    getAverageRating,
};
