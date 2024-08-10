// external dependencies
import express from "express";
import { Collection } from "./main.types";
// internal dependencies

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const collections: Collection[] = [
  {
    id: "1",
    name: "Collection 1",
    description: "Description 1",
    image: "https://via.placeholder.com/150",
    products: [
      {
        id: "1",
        name: "Product 1",
        image:
          "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
        description: "Product 1 description",
        price: 100,
        inventory: 10,
        rating: 4,
      },
      {
        id: "2",
        name: "Product 2",
        image:
          "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
        description: "Product 2 description",
        price: 200,
        inventory: 20,
        rating: 4,
      },
    ],
  },
  {
    id: "2",
    name: "Collection 2",
    description: "Description 2",
    image: "https://via.placeholder.com/150",
    products: [
      {
        id: "3",
        name: "Product 3",
        image:
          "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
        description: "Product 3 description",
        price: 300,
        inventory: 30,
        rating: 4,
      },
      {
        id: "4",
        name: "Product 4",
        image:
          "https://www.kermanig.com/cdn/shop/products/Newfixed000000.jpg?v=1681244936&width=165",
        description: "Product 4 description",
        price: 400,
        inventory: 40,
        rating: 4,
      },
    ],
  },
];

app.get("/", (_, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/collections", (_, res) => {
  res.json({ result: collections });
});

app.get("/collections/:id", (req, res) => {
  const collection = collections.find(
    (collection) => collection.id === req.params.id
  );
  if (!collection) {
    res.status(404).json({ error: "Collection not found" });
    return;
  }
  res.json({ result: collection });
});

app.get("/products/:id", (req, res) => {
  const product = collections
    .map((collection) => collection.products)
    .flat()
    .find((product) => product.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ result: product });
});
