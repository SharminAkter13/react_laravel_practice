import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './component/Category';
import AddCategoey from './component/AddCategoey';
import Edit from './component/Edit';
import Product from './component/products/Product';
import AddProduct from './component/products/AddProduct';
import EditProduct from './component/products/EditProduct';
import User from './component/users/User';
import AddUser from './component/users/AddUser';
import EditUser from './component/users/EditUser';


const App = () => {
  
  return (
    <div>
      <BrowserRouter>
    <Routes>
              <Route path="/category" element={<Category />} />
              <Route exact path='/' element = {<AddCategoey/>}/>
               <Route exact path='/edit/:id' element = {<Edit/>}/>
               <Route path="/product" element={<Product />} />
              <Route exact path='/add-product' element = {<AddProduct/>}/>
               <Route exact path='/edit-product/:id' element = {<EditProduct/>}/>
               <Route path="/user" element={<User />} />
              <Route exact path='/add-user' element = {<AddUser/>}/>
               <Route exact path='/edit-user/:id' element = {<EditUser/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
