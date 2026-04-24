import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/Loading';
import { FaCamera } from 'react-icons/fa';
import Dropzone from 'react-dropzone';

const Profile = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();

  const user = useSelector((state) => state.user);

  const { data: userData, loading } = useFetch(
    `${API_URL}/user/get-user/${user?.user?._id}`,
    {
      method: 'get',
      credentials: 'include',
    },
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    username: z.string().min(4, 'Useername must be at least 3 character long'),
    email: z.email('Invalid email address'),
    bio: z.string().min(8, 'Bio must be at least 8 character long'),
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

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        username: userData.user.username,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(values));

      const response = await fetch(
        `${API_URL}/user/update-user/${userData.user._id}`,
        {
          method: 'put',
          credentials: 'include',
          body: formData,
        },
      );

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

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  if (loading) return <Loading />;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-32 h-32 relative group">
                  <AvatarImage
                    src={filePreview ? filePreview : userData?.user?.avatar}
                  />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center items-center bg-black/20 border-2 border-black rounded-full group-hover:flex hidden cursor-pointer">
                    <FaCamera fontSize={30} />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
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
