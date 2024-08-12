# BakerShop API Server


## Features

1. **Home page including collections and carousel auto play components**
2. **Collections and Products detail page with product image and prices**
3. **Cart functionality persising after refreshing**
4. **Admin page for getting/updating the collections/products/carousels data from the mock backend**
5. **PDF summary report on the cart page**
6. **Follow website styles and layout to make it similiar**

Features

How to run

Extract the repository
Build the project
npm run build

Run the application
npm run dev

It would be running on port 3000

API endpoints

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
