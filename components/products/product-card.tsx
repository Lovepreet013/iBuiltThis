import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { StarIcon } from 'lucide-react';
import { InferSelectModel } from 'drizzle-orm';
import { products } from '@/db/schema';
import VotingButtons from './voting-buttons';

export type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  const hasVoted = false;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50">
        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle>{product.name}</CardTitle>
                {product.voteCount > 100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </div>

            {/* Voting Buttons */}
            <VotingButtons
              hasVoted={hasVoted}
              voteCount={product.voteCount}
              productId={product.id}
            />
          </div>
        </CardHeader>

        <CardFooter>
          <div className="flex items-center gap-2">
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
