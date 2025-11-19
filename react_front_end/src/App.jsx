import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './component/Category';
import AddCategoey from './component/AddCategoey';
import Edit from './component/Edit';


const App = () => {
  
  return (
    <div>
      <BrowserRouter>
    <Routes>
              <Route path="/category" element={<Category />} />
              <Route exact path='/' element = {<AddCategoey/>}/>
               <Route exact path='/edit/:id' element = {<Edit/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
