'use client';

import { addProductAction } from '@/lib/products/product-actions';
import { FormField } from '../forms/form-field';
import { Button } from '../ui/button';
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { FormState } from '@/types';
import { cn } from '@/lib/utils';

const initialState: FormState = {
  success: false,
  errors: undefined,
  message: '',
};

export default function ProductSubmitForm() {
  //to handle the form submission loading state and stuff we use the useActionState hook from react.
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );

  // const handleSubmit = async (formData: FormData) => {
  //   //to handle the form submission loading state and stuff we use the useActionState hook from react.

  //   await addProductAction(formData);
  // };

  const { success, errors, message } = state;

  return (
    <form className="space-y-6" action={formAction}>
      {message && (
        <div
          className={cn(
            'p-4 rounded-lg border',
            success
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-destructive/10 border-destructive text-destructive'
          )}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <FormField
        label="Name"
        name="name"
        id="name"
        placeholder="Enter your product name"
        required
        onChange={() => {}}
        errors={errors?.name || []}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="Enter your product slug"
        required
        onChange={() => {}}
        errors={errors?.slug || []}
        helperText="The slug is URL-friendly and will be used to identify your product."
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="Enter your product tagline"
        required
        onChange={() => {}}
        errors={errors?.tagline || []}
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Enter your product description"
        required
        onChange={() => {}}
        errors={errors?.description || []}
        textarea={true}
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="Enter your product website URL"
        required
        onChange={() => {}}
        errors={errors?.websiteUrl || []}
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="Enter your product tags"
        required
        onChange={() => {}}
        errors={errors?.tags || []}
        helperText="Separate tags with commas (e.g. AI, Productivity, Tools)"
      />
      <Button type="submit" className="w-full">
        {isPending ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          'Submit Product'
        )}
      </Button>
    </form>
  );
}
