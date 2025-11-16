import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './component/Category';
const App = () => {
  
  return (
    <div>
      <BrowserRouter>
    <Routes>
              <Route path="/" element={<Category />} />

    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
