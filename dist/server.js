"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./middleware/logger"));
//............................routes.........................
// import routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const upload_1 = __importDefault(require("./routes/upload"));
const helmet_1 = __importDefault(require("helmet")); //development dependency
const cors_1 = __importDefault(require("cors")); //production dependency
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); //production dependency
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)(); //tell ts that this is an express app
(0, db_1.default)();
// Middlewares (ORDER IMPORTANT)
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // change in production
}));
app.use(express_1.default.json());
app.use(logger_1.default);
// Serve static files from the uploads directory
app.use("/uploads", express_1.default.static("uploads"));
// ✅ Rate limiter (CONFIGURED)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per IP
});
app.use(limiter);
//...............................get............................
// app.get("/users", (req, res) => {
//   const users = [
//     { id: 1, name: "Komal" },
//     { id: 2, name: "Mansi" }
//   ];
//   res.json(users);
// });
// app.get("/products", (req,res)=>{
//     const products= [
//  { id: 1, name: "Laptop" },
//  { id: 2, name: "Phone" }
// ];
// res.json(products)
// })
// app.get("/status", (req,res)=>{
//     const products= [
//  { "message": "API working"}
// ];
// res.json(products)
// })
//...................................post................................
// app.post("/users", (req, res) => {
//   console.log(req.body);
//   res.send({
//  "message": "User created",
//  "data":
//    req.body
// });
// });
// app.post("/products", (req, res) => {
//   console.log(req.body);
//   res.send({
//  "message": "Product created",
//  "data":  req.body
// });
// });
//.............................params and query..............................
//params
// app.get("/products/:id", (req, res) => {
//   const productId=req.params.id
//   res.send(
//    `Product ID is ${productId}`
//   );
// });
// //query
// app.get("/products", (req, res) => {
//   const category = req.query.category;
//   const price = req.query.price;
//   res.json({
//     category,
//     price
//   });
// });
// use routes
app.use("/users", userRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/upload", upload_1.default);
// Error handling middleware MUST be registered after all routes
app.use(errorHandler_1.errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map