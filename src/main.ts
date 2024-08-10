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
        image: "https://via.placeholder.com/150",
        price: 100,
        inventory: 10,
      },
      {
        id: "2",
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        price: 200,
        inventory: 20,
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
        image: "https://via.placeholder.com/150",
        price: 300,
        inventory: 30,
      },
      {
        id: "4",
        name: "Product 4",
        image: "https://via.placeholder.com/150",
        price: 400,
        inventory: 40,
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
