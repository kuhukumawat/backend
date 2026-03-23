"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET /products
router.get("/", (req, res) => {
    res.send("All products");
});
router.post("/", (req, res) => {
    const product = req.body;
    console.log(product);
    res.json({
        message: "Product created successfully",
        data: product,
    });
});
exports.default = router;
//# sourceMappingURL=productRoutes.js.map