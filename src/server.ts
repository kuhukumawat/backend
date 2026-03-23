import express, { Application } from "express";
import connectDB from "./config/db";
import logger from "./middleware/logger";
import auth from "./middleware/auth";
//............................routes.........................
// import routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authRoute from "./routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express(); //tell ts that this is an express app

app.use(express.json());
connectDB();
app.use(logger);
app.use("/users", auth);
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
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
