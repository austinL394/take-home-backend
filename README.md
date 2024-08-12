# BakerShop API Server

## Requirements
1. Node.js v20.11.0
2. NPM v10.2.4

## Features
1. HomePage (https://www.kermanig.com/)
- Display the list advertising images using Carousel that is auto-playing
- Display the list of "collections" with image, title and description in the given layout
- Clicking the collection image should let the user navigate to its detail page

2. Collection Detail Page (https://www.kermanig.com/collections/baklava)
- Display the collection title, description and products (image, title and price) in pagination
- Clicking the product image should let the user navigate to its detail page

3. Product Detail Page (https://www.kermanig.com/products/baklava)
- Display the product image (choose one from the list), title, stars, description, price
- Display the "Quantity" input and "Add to cart" button to add the item to the cart
- Cart icon should display the number of items in the cart on Header component
  (Header component is visible on top of all the pages)
- Logo icon should be visible on Header component and clicking it should let the user navigate to HomePage
- Clicking "Cart" icon should let the user navigate to Cart page

4. Cart Page (https://www.kermanig.com/cart)
- Display the list of items in the cart with image, title and price
- Display the "Quantity" input and "Delete" button for each item to manage items in the cart
- Group the same product to be managed easily on the cart page
- Clicking "Check out" button should generate a PDF showing the list of cart items and save the PDF file on the backend
- Refreshing the page should persist the cart items

5. Admin Page
- Administrator should be able to manage all the "Product", "Collection", "Carousel" data in JSON format
- Clicking "Save" button should synchronize all the input data to the backend
- No DB is required but while designing data structure, make sure to follow the best practices
- Initially, define your own basic data for testing

Notes:
- Don't use ChatGPT
- UI doesn't need to be exactly the same but need to be similar to the given website's layout

## API endpoints

  Read and Update Collections

  - URL: /api/collections
  - Method: GET/POST
    Read and Update Products
  - URL: /api/products
  - Method: GET/POST
    Read and Update Carousels
  - URL: /api/carousels
  - Method: GET/POST
    Getting collection detail by title
  - URL: /api/collections/:title
  - Method: GET


## Installation

To install and run the Fillout API Server, follow these steps:

1. Clone the repository:

   ```shell
   git clone git@github.com:austinL394/take-home-backend.git

   ```

2. Run the app

   ```shell
   npm start
   ```

3. Run the app in dev mode

   ```shell
   npm run dev
   ```

## API endpoints

- Read and Update Collections
  - URL: `/getPureCollections`
  - Method: `GET`
  - URL: '/collections
  - Method: `Put`
- Read Collection data from HomePage
  - URL: `/collections`
  - Method: `GET`
- Read and Update Products
  - URL: `/products
  - Method: `GET/PUT`
- Read and Update Carousels
  - URL: `/carousels`
  - Method: `GET/PUT`
- Read and Update 
  - URL: `/api/collections/:title`
  - Method: `GET`
- PDF Upload
  - URL: `/upload`
  - Method: `POST`


## Challenges

- Generating PDF format of the cart and uploading to the backend.
