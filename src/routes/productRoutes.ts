import express, { Request, Response } from "express";

const router = express.Router();

// GET /products
router.get("/", (req: Request, res: Response) => {
  res.send("All products");
});

router.post("/", (req: Request, res: Response) => {
  const product = req.body;
  console.log(product);
  res.json({
    message: "Product created successfully",
    data: product,
  });
});

export default router;
