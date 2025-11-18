import React, {  useEffect, useState } from "react";
import axios from "axios";
import Category from './Category';
const AddCategoey = () => {
    const [categories, setCategory] = useState([]);
    const [name, setName] = useState("");
  

  const createCategory = async () => {
    await axios.post("http://127.0.0.1:8000/api/categories", {name });
fetchCategory();
  };
    const fetchCategory = async () => {
    try {
      const resource = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategory(resource.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  },[]);
    return (
        <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Category List</h4>
        </div>
        <div className="card-body">
          <form>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
           
            <button onClick={createCategory}>Add Category</button>
          </form>
        </div>
        <div className="col-md-10">
          <Category  
          categories={categories} 
          fetchCategory={fetchCategory}/>
        </div>
       </div>
      </div>
    );
};

export default AddCategoey;