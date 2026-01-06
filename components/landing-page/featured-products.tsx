import { ArrowUpRightIcon, StarIcon } from 'lucide-react';
import SectionHeader from '../common/section-header';
import { Button } from '../ui/button';
import Link from 'next/link';
import ProductCard from '../products/product-card';

const featuredProducts = [
  {
    id: 1,
    name: 'Power Parity',
    description: `AI-powered energy consumption optimizer for smart homes.`,
    websiteUrl: 'https://google.com',
    tags: ['AI', 'Energy', 'Smart Home'],
    votes: 124,
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Power Parity',
    description: `AI-powered energy consumption optimizer for smart homes.`,
    websiteUrl: 'https://google.com',
    tags: ['AI', 'Energy', 'Smart Home'],
    votes: 124,
    isFeatured: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Products"
            icon={StarIcon}
            description="Top picks from our community this week."
          />

          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/explore">
              View All <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
