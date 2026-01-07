'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { productSchema } from './product-validation';
import { db } from '@/db';
import { products } from '@/db/schema';
import z from 'zod';
import { FormState } from '@/types';
import { eq, sql } from 'drizzle-orm';
import { refresh, revalidatePath } from 'next/cache';

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  console.log(formData);

  //auth check
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to submit a product.',
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: 'You must be a member of an organization to submit a product.',
      };
    }

    //user email
    const user = await currentUser();
    const userEmail = user ? user.emailAddresses[0].emailAddress : 'anonymous';

    //validate the form data
    //here we are getting the form data
    const rawData = Object.fromEntries(formData.entries());

    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Invalid form data.',
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === 'string') : [];

    //adding to db
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: 'pending',
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      message: 'Product submitted successfully! It will be reviewed shortly.',
    };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: 'failed to submit product',
      };
    }
    return {
      success: false,
      errors: {
        form: ['An error occurred while submitting the product.'],
      },
      message: 'An error occurred while submitting the product.',
    };
  }
};

export const productUpvoteAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to submit a product.',
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: 'You must be a member of an organization to submit a product.',
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count + 1)`,
      })
      .where(eq(products.id, productId));

    revalidatePath('/');

    return {
      success: true,
      message: 'Product upvoted successfully!',
      voteCount: productId,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while upvoting the product.',
      voteCount: 0,
    };
  }
};

export const productDownVoteAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'You must be logged in to submit a product.',
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: 'You must be a member of an organization to submit a product.',
      };
    }

    await db
      .update(products)
      .set({
        voteCount: sql`GREATEST(0, vote_count - 1)`,
      })
      .where(eq(products.id, productId));

    revalidatePath('/');

    return {
      success: true,
      message: 'Product downvoted successfully!',
      voteCount: productId,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while downvoting the product.',
      voteCount: 0,
    };
  }
};
