import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.any(),
  price: z.number(),
  inventory: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  products: z.array(
    z.object({
      name: z.string(),
      image: z.any(),
      price: z.number(),
      inventory: z.number(),
    }),
  ),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const CollectionsResponseSchema = z.object({
  result: z.array(CollectionSchema),
});

export type CollectionsResponse = z.infer<typeof CollectionsResponseSchema>;
