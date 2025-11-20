import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function Product() {
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const deleteProduct = async(id) =>{
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
    fetchProduct();
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products");
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const getCategoryName = (id) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Product List</h4>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.description}</td>

                      {/* show category name */}
                      <td>{getCategoryName(p.category_id)}</td>

                      <td>
                        <button onClick={() => deleteProduct(p.id)} className="btn btn-danger">
                          <i className="bi bi-trash3-fill"></i>
                        </button>

                        <NavLink to={`/edit-product/${p.id}`} className="btn btn-info mx-2">
                          <i className="bi bi-pencil-square"></i>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No products found</td>
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

export default Product;
