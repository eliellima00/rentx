"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
require("reflect-metadata");
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _AppError = require("../../errors/AppError");
var _typeorm = _interopRequireDefault(require("../typeorm"));
var _upload = _interopRequireDefault(require("../../../config/upload"));
var _swagger = _interopRequireDefault(require("../../../swagger.json"));
var _routes = require("./routes");
require("../../container");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));

// defino que esses locais serão usados para servir staticamente
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router);
(0, _typeorm.default)();
// factoryConfigAWS();

app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    }).send();
  }
  return response.status(500).json({
    status: "error",
    messsage: `Internal server error - ${err.message}`
  });
});