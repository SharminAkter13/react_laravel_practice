import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './component/Category';
import AddCategoey from './component/AddCategoey';
import Edit from './component/Edit';
import Product from './component/products/Product';
import AddProduct from './component/products/AddProduct';
import EditProduct from './component/products/EditProduct';


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
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
