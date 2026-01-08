import { products } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;

export interface FormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}
