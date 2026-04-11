import Layout from '@/Layout/Layout';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RouteAddCategory,
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
