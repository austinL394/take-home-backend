export interface Product {
  id: string;
  name: string;
  image: any; // TODO should be defined
  price: number;
  inventory: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Array<Product>;
}
