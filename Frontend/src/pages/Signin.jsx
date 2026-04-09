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
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { showToast } from '@/helpers/showToast';

const Signin = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'password must be at least 6 character long'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message);
      }
      navigate(RouteIndex);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-100 p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Login Into Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        autoComplete="email"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don&apos;t have account?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignUp}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
