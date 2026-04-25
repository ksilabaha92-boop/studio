'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/types';
import { ALL_COLORS } from '@/lib/data';
import { Checkbox } from './ui/checkbox';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { Switch } from './ui/switch';

const ProductFormSchema = z
  .object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters' }),
    price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
    colors: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one color.',
    }),
    image: z.string().min(1, { message: 'Please upload an image.' }),
    onSale: z.boolean().default(false),
    discountPrice: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      if (data.onSale && (!data.discountPrice || data.discountPrice <= 0)) {
        return false;
      }
      return true;
    },
    {
      message: 'Discount price must be set and positive when item is on sale.',
      path: ['discountPrice'],
    }
  )
  .refine(
    (data) => {
      if (data.onSale && data.discountPrice && data.discountPrice >= data.price) {
        return false;
      }
      return true;
    },
    {
      message: 'Discount price must be less than the original price.',
      path: ['discountPrice'],
    }
  );

type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

type ProductFormProps = {
  onProductAdd: (product: ProductFormData) => void;
  onProductUpdate: (product: Product) => void;
  productToEdit: Product | null;
  onFormSubmit: () => void;
};

export function ProductForm({
  onProductAdd,
  onProductUpdate,
  productToEdit,
  onFormSubmit,
}: ProductFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isEditMode = !!productToEdit;

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      colors: [],
      image: '',
      onSale: false,
      discountPrice: 0,
    },
  });

  useEffect(() => {
    if (isEditMode && productToEdit) {
      form.reset({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        colors: productToEdit.colors,
        image: productToEdit.mainImageUrl,
        onSale: productToEdit.onSale ?? false,
        discountPrice: productToEdit.discountPrice ?? 0,
      });
      setImagePreview(productToEdit.mainImageUrl);
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        colors: [],
        image: '',
        onSale: false,
        discountPrice: 0,
      });
      setImagePreview(null);
    }
  }, [productToEdit, form, isEditMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue('image', result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof ProductFormSchema>) {
    setIsSubmitting(true);

    const productData = {
      name: values.name,
      description: values.description,
      price: values.price,
      onSale: values.onSale,
      discountPrice: values.onSale ? values.discountPrice : undefined,
      colors: values.colors,
      mainImageUrl: values.image,
      imageHint: `${values.name} pottery`,
      available: productToEdit?.available ?? true,
    };

    if (isEditMode) {
      onProductUpdate({
        ...productToEdit,
        ...productData,
      });
      toast({
        title: 'Product Updated!',
        description: `${values.name} has been successfully updated.`,
      });
    } else {
      onProductAdd(productData as ProductFormData);
      toast({
        title: 'Product Added!',
        description: `${values.name} is now available in the store.`,
      });
    }

    setIsSubmitting(false);
    onFormSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Artisan Vase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the product..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (TND)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="95" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 rounded-md border p-4 bg-secondary/20">
          <FormField
            control={form.control}
            name="onSale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Put on Sale</FormLabel>
                  <FormDescription>
                    Enable to set a discount price.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch('onSale') && (
            <FormField
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price (TND)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="75"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="colors"
          render={() => (
            <FormItem>
              <FormLabel>Available Colors</FormLabel>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                  >
                    <span>
                      {form.watch('colors')?.length > 0
                        ? `${form.watch('colors').length} color(s) selected`
                        : 'Select colors...'}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    {ALL_COLORS.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="colors"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: item.value }}
                                />
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {imagePreview && (
          <div className="w-full aspect-square relative rounded-md overflow-hidden border-2 border-dashed">
            <Image
              src={imagePreview}
              alt="Image preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        <Button type="submit" className="w-full btn-clay" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? 'Updating...'
              : 'Adding...'
            : isEditMode
            ? 'Update Product'
            : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
