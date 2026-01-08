'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import {
  productDownVoteAction,
  productUpvoteAction,
} from '@/lib/products/product-actions';
import { useOptimistic, useState, useTransition } from 'react';
import { useUser } from '@clerk/nextjs';

export default function VotingButtons({
  voteCount: initialVoteCount,
  productId,
}: {
  voteCount: number;
  productId: number;
}) {
  const { isSignedIn } = useUser();

  const [hasVoted, setHasVoted] = useState(false);

  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );

  const [isPending, startTransition] = useTransition();

  const handleUpvote = async () => {
    if (!isSignedIn) {
      alert('You must be signed in to vote.');
      return;
    }

    if (!hasVoted) {
      startTransition(async () => {
        setOptimisticVoteCount(1);
        await productUpvoteAction(productId);
      });
      setHasVoted(true);
    }
  };

  const handleDownVote = async () => {
    if (!isSignedIn) {
      alert('You must be signed in to vote.');
      return;
    }

    if (hasVoted) {
      startTransition(async () => {
        setOptimisticVoteCount(-1);
        await productDownVoteAction(productId);
      });
      setHasVoted(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          'h-8 w-8 text-primary',
          hasVoted && isSignedIn
            ? ' bg-primary/10 text-primary hover:bg-primary/20 cursor-not-allowed'
            : 'hover:bg-primary/10 hover:text-primary'
        )}
        disabled={isPending}
      >
        <ChevronUpIcon className="size-5" />
      </Button>

      <span
        className={cn(
          'text-sm font-semibold transition-colors text-foreground',
          hasVoted && isSignedIn ? 'text-primary' : ''
        )}
      >
        {optimisticVoteCount}
      </span>

      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          'h-8 w-8 text-primary hover:bg-primary/20',
          hasVoted ? 'hover:text-destructive' : 'opacity-50 cursor-not-allowed'
        )}
        onClick={handleDownVote}
        disabled={isPending}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}
