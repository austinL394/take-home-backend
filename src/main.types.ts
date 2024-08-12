export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  description: string;
  inventory: number;
  rating: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Array<string>;
}
