"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const AppError_1 = require("@shared/errors/AppError");
const typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
const upload_1 = __importDefault(require("@config/upload"));
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
const routes_1 = require("./routes");
require("@shared/container");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// defino que esses locais serão usados para servir staticamente
app.use("/avatar", express_1.default.static(`${upload_1.default.tmpFolder}/avatar`));
app.use("/cars", express_1.default.static(`${upload_1.default.tmpFolder}/cars`));
app.use(routes_1.router);
(0, typeorm_1.default)();
// factoryConfigAWS();
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response
            .status(err.statusCode)
            .json({
            message: err.message,
        })
            .send();
    }
    return response.status(500).json({
        status: "error",
        messsage: `Internal server error - ${err.message}`,
    });
});
