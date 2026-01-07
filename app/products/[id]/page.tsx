'use cache'; //using this to tell next.js that this page is dynamic and it should be cached

import { getFeaturedProducts } from '@/lib/products/product-select';

//we use generateStaticParams to generate static paths for the page at build time
export async function generateStaticParams() {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
//this is dynamic route, and we are using cache components, next.js need to know that this page is dynamic and it should be cached
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; //since params is a promise, we need to await it
  return <div>Product Details Page with id : {id}</div>;
}
