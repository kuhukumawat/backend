"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log("Logger working");
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map