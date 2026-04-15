import Layout from '@/Layout/Layout';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from './helpers/RouteName';
import Index from './pages/Index';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AddCategory from './pages/Category/AddCategory';
import CategoryDetails from './pages/Category/CategoryDetails';
import EditCategory from './pages/Category/EditCategory';
import EditBlog from './pages/Blog/EditBlog';
import BlogDetails from './pages/Blog/BlogDetails';
import AddBlog from './pages/Blog/AddBlog';
import SingleBlogDetails from './pages/SingleBlogDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          <Route path={RouteProfile} element={<Profile />} />

          {/* blog category */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* blog */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
