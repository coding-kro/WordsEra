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
import { RouteSignIn } from '@/helpers/RouteName';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { showToast } from '@/helpers/showToast.js';
import GoogleLogin from '@/components/GoogleLogin';

const Signup = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 character long'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 character long'),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        'password must be same',
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message);
      }

      navigate(RouteSignIn);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-100 p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create Your Account
        </h1>

        <div>
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">Or</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        autoComplete="username"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        type="email"
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
                        autoComplete="new-password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your again"
                        autoComplete="new-password"
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
                Sign up
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Alresdy have an account?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignIn}
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
