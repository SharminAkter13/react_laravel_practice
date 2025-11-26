import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './component/Home';

import Category from './component/Category';
import AddCategoey from './component/AddCategoey';
import Edit from './component/Edit';

import Product from './component/products/Product';
import AddProduct from './component/products/AddProduct';
import EditProduct from './component/products/EditProduct';

import User from './component/users/User';
import AddUser from './component/users/AddUser';
import EditUser from './component/users/EditUser';
import Register from './component/authentication/Register';
import Login from './component/authentication/Login';
import Master from './component/Master';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/master' element={<Master />} />

        <Route path="/category" element={<Category />} />
        <Route path='/add-category' element={<AddCategoey />} />
        <Route path='/edit/:id' element={<Edit />} />

        <Route path="/product" element={<Product />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />

        <Route path="/user" element={<User />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/edit-user/:id' element={<EditUser />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
