import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './component/Category';
import AddCategoey from './component/AddCategoey';



const App = () => {
  
  return (
    <div>
      <BrowserRouter>
    <Routes>
              <Route path="/category" element={<Category />} />
              <Route exact path='/' element = {<AddCategoey/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
