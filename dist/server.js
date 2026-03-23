"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("./config/db.js"));
const logger_js_1 = __importDefault(require("./middleware/logger.js"));
const auth_js_1 = __importDefault(require("./middleware/auth.js"));
//............................routes.........................
// import routes
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)(); //tell ts that this is an rexpress app
app.use(express_1.default.json());
(0, db_js_1.default)();
app.use(logger_js_1.default);
app.use("/users", auth_js_1.default);
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
app.use("/users", userRoutes_js_1.default);
app.use("/products", productRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
//# sourceMappingURL=server.js.map