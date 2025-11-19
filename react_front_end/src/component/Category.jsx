import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

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
    <div className="container mt-5">
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
                      <td><button onClick={() =>deleteCategory(p.id)}><i className="bi bi-trash3-fill"></i></button>
                       <NavLink to={`/edit/${p.id}`} className="btn btn-info mx-2"><i class="bi bi-pencil-square"></i></NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
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
  );
}

export default Category;
