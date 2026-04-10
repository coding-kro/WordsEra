import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '@/helpers/showToast';
import { setUser } from '@/redux/user/user.slice';
import { useDispatch } from 'react-redux';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  const dispatch = useDispatch();

  const formSchema = z.object({
    username: z.string().min(4, 'Useername must be at least 3 character long'),
    email: z.email('Invalid email address'),
    bio: z.string().min(8, 'Bio must be at least 8 character long'),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
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

      dispatch(setUser(data.user));

      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>
        <div>
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
                          type="text"
                          placeholder="Enter your username "
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
                          type="email"
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
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

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
