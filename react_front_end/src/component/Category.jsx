import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Master from "./Master"; // <-- Import the Master layout component

function Category() {
  const [categories, setCategory] = useState([]);


  const deleteCategory = async(id) =>{
    await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
    fetchCategory();
  }
  
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
  }, []);

  return (
    <Master> {/* <-- Wrap the content with the Master layout */}
      
      <div className="container-fluid">
        
        {/* Header and Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-4 pt-2">
          <h2 className="mb-0">Categories Management</h2>
          <NavLink to="/add-category" className="btn btn-success shadow-sm">
            <i className="bi bi-plus-circle me-2"></i>Add New Category
          </NavLink>
        </div>
        
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Category List</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((p, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{p.name}</td>
                        <td>
                          {/* Delete Button */}
                          <button 
                            onClick={() =>deleteCategory(p.id)} 
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                          
                          {/* Edit Link */}
                          <NavLink 
                            to={`/edit/${p.id}`} 
                            className="btn btn-info btn-sm mx-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
    </Master>
  );
}

export default Category;