import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import slugify from 'slugify';
import { showToast } from '@/helpers/showToast';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';

const EditCategory = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { category_id } = useParams();
  // console.log(category_id);

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${API_URL}/category/show/${category_id}`,
    {
      method: 'get',
      Credential: 'include',
    },
    [category_id],
  );

  // console.log(categoryData);

  const formSchema = z.object({
    name: z.string().min(3, 'name must be at least 3 character long'),
    slug: z.string().min(3, 'slug must be at least 3 character long'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const categoryName = form.watch('name');

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue('slug', slug);
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryData) {
      form.setValue('name', categoryData.category.name);
      form.setValue('slug', categoryData.category.slug);
    }
  }, [categoryData]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${API_URL}/category/update/${category_id}`,
        {
          method: 'put',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast('error', data.message);
      }
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  }
  return (
    <div>
      <Card className="pt-5 max-w-3xl mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="slug"
                          autoComplete="slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
