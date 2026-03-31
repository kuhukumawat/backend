"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppLogger_1 = require("../utils/AppLogger");
const logger = (req, res, next) => {
    AppLogger_1.AppLogger.info(`${req.method} ${req.url}`);
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map