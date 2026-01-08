import { db } from '@/db';
import { products } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { connection } from 'next/server';

export async function getFeaturedProducts() {
  'use cache'; //using this to tell next.js that this function should be cached
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, 'approved'))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getAllProducts() {
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, 'approved'))
    .orderBy(desc(products.voteCount));
  return productsData;
}

//but this function need to be dynamic as recent products are dynamic and we want it at runtime, so we can't use cache here
export async function getRecentlyLaunchedProducts() {
  //we use connection here
  await connection();
  const productsData = await getAllProducts();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return productsData.filter(
    (product) =>
      product.createdAt &&
      new Date(product.createdAt.toISOString()) >= oneWeekAgo
  );
}

export async function getProductBySlug(slug: string) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return product?.[0] ?? null;
}
