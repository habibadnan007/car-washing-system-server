"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const errHandler_1 = require("./app/middleware/errHandler");
const routes_1 = __importDefault(require("./app/routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const axiosInstance = axios_1.default.create({
    timeout: 30000, // 30 seconds timeout
});
//   10 minute
//   */10 * * * *
// Self-ping task
node_cron_1.default.schedule('*/10 * * * *', () => {
    axiosInstance
        .get(`https://car-washing-system.onrender.com`)
        .then((response) => {
        console.log('😀🎉 Self-ping successful after every 10m:', response.status);
    })
        .catch((error) => {
        console.error('😡 Self-ping failed:', error.message);
    });
});
// parser
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
// Home route to test server
app.get('/api/v1', (req, res) => {
    res.status(200).send({ success: true, message: 'This is base url!' });
});
app.get('/', (req, res) => {
    res.status(200).send({ success: true, message: 'This is homepage' });
});
// err handling middleware
app.use(errHandler_1.notFoundErrHandler);
app.use(errHandler_1.globalErrHandler);
exports.default = app;
