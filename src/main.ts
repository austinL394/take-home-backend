import express from "express";
import { Collection, Product } from "./main.types";
const multer = require("multer");

var upload = multer({
  dest: "uploads/",
  preservePath: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let collections: Collection[] = [
  {
    id: "1",
    name: "Collection 1",
    description: "Description 1",
    image:
      "https://www.kermanig.com/cdn/shop/collections/template-baklava.jpg?v=1668195791&width=165",
    products: ["1", "2"],
  },
  {
    id: "2",
    name: "Collection 2",
    description: "Description 2",
    image:
      "https://www.kermanig.com/cdn/shop/collections/template-baklava.jpg?v=1668195791&width=165",
    products: ["3", "4"],
  },
];

let products: Product[] = [
  {
    id: "1",
    name: "Almond Cake",
    images: [
      "https://www.kermanig.com/cdn/shop/products/Almondcake12115.png?v=1694735118&width=165",
      "https://www.kermanig.com/cdn/shop/products/20200701_161708.jpg?v=1596140081&width=600",
    ],
    description:
      "Satisfy your sweet tooth with this one-of-a-kind Almond Cake! Made with almond, vanilla extract, and a dash of magic, this cake is perfect for any dessert, tea, or coffee cravings. So grab a fork and dig in!",
    price: 9.99,
    inventory: 10,
    rating: 4,
  },
  {
    id: "2",
    name: "Raisin Cake",
    images: [
      "https://www.kermanig.com/cdn/shop/products/Raisincakeedited112115.png?v=1694735160&width=165",
      "https://www.kermanig.com/cdn/shop/products/20200701_161708.jpg?v=1596140081&width=600",
    ],
    description:
      "Our Raisin Cake is moist and delicious, sure to tantalize your taste buds. Freshly made with raisins and baked to perfection, every bite is filled with flavor. Enjoy a sweet treat with this heavenly cake.",
    price: 9.99,
    inventory: 20,
    rating: 4,
  },
  {
    id: "3",
    name: "Product 3",
    images: [
      "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
      "https://www.kermanig.com/cdn/shop/products/20200701_161708.jpg?v=1596140081&width=600",
    ],
    description: "Product 3 description",
    price: 300,
    inventory: 30,
    rating: 4,
  },
  {
    id: "4",
    name: "Product 4",
    images: [
      "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
      "https://www.kermanig.com/cdn/shop/products/20200701_161708.jpg?v=1596140081&width=600",
    ],
    description: "Product 4 description",
    price: 400,
    inventory: 40,
    rating: 4,
  },
];

let carousels = [
  "https://www.kermanig.com/cdn/shop/files/Sarkis.jpg?v=1681245557&width=3840",
  "https://www.kermanig.com/cdn/shop/files/Monthly_promotions_4.jpg?v=1684538884&width=3840",
  "https://www.kermanig.com/cdn/shop/files/Orange_and_Green_Abstract_Shapes_Free_Shipping_Nationwide_Banner_09ab6816-8a57-4217-9d47-990a6742ed68.png?v=1684540685&width=3840",
];

app.get("/", (_, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});

app.get("/collections", (_, res) => {
  res.json({
    result: collections.map((collection) => ({
      ...collection,
      products: collection.products.map((productId) =>
        products.find((product) => product.id == productId)
      ),
    })),
  });
});

// Retrieve all collections without populating products
app.get("/getPureCollections", (_, res) => {
  try {
    res.json({
      result: collections,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/collections", (_, res) => {
  try {
    res.json({
      result: collections.map((collection) => ({
        ...collection,
        products: collection.products.map((productId) =>
          products.find((product) => product.id == productId)
        ),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/collections", (req, res) => {
  const { payload } = req.body;
  try {
    collections = JSON.parse(payload);
    res.send("Collections updated");
  } catch (error) {
    res.status(400).json({ error: "Invalid payload" });
  }
});

app.get("/collections/:id", (req, res) => {
  const collection = collections.find(
    (collection) => collection.id == req.params.id
  );
  if (!collection) {
    res.status(404).json({ error: "Collection not found" });
    return;
  }
  res.json({
    result: {
      ...collection,
      products: collection.products.map((productId) =>
        products.find((product) => product.id == productId)
      ),
    },
  });
});

// Retrieve all carousels
app.get("/carousels", (_, res) => {
  try {
    res.json({ result: carousels });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/carousels", (req, res) => {
  const { payload } = req.body;
  try {
    carousels = JSON.parse(payload);
    res.send("Carousels updated");
  } catch (error) {
    res.status(400).json({ error: "Invalid payload" });
  }
});

// Retrieve all products
app.get("/products", (req, res) => {
  try {
    res.json({ result: products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/products", (req, res) => {
  const { payload } = req.body;
  try {
    products = JSON.parse(payload)[0];
    res.send("Products updated");
  } catch (error) {
    res.status(400).json({ error: "Invalid payload" });
  }
});

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ result: product });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});
