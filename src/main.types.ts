/**
 * @description Defines a contract for an object that has the following properties:
 * 
 * * `id`: a string value
 * * `name`: a string value
 * * `image`: any type of value (a TODO comment suggests that this should be replaced
 * with a more specific definition)
 * * `price`: a number value
 * * `inventory`: a number value
 */
export interface Product {
  id: string;
  name: string;
  image: any; // TODO should be defined
  price: number;
  inventory: number;
}

/**
 * @description Defines a type for an object with five properties. The properties include:
 * 
 * * `id`: A string representing a unique identifier.
 * * `name`: A string representing the name of the collection.
 * * `description`: A string representing a brief description of the collection.
 * * `image`: A string representing the URL or path to an image associated with the
 * collection.
 * * `products`: An array of `Product` objects, which is expected to be implemented
 * separately.
 */
export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Array<Product>;
}
