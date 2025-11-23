import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function Product() {
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const deleteProduct = async(id) =>{
    // Add a confirmation dialog similar to your Laravel example
    if (window.confirm('Are you sure you want to delete this product?')) {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
        fetchProduct();
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products");
      // Assuming 'res.data' is an array of products
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      // Assuming 'res.data' is an array of categories
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const getCategoryDetails = (id) => {
    const category = categories.find(c => c.id === id);
    if (!category) {
        return (
            <>
                <span>Unknown Name</span><br />
                <span className="text-muted">ID: {id}</span>
            </>
        );
    }
    // Mimic your Laravel structure by using <br /> to display multiple lines of data
    return (
        <>
            <span className="fw-bold">{category.name}</span><br />
            <small className="text-muted">ID: {category.id}</small>
        </>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        {/* Changed background color to match the "success" theme of your Laravel table's styling */}
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Product List</h4>
          {/* Added a 'Create' link similar to your Laravel table */}
          <NavLink to={`/create-product`} className="btn btn-light btn-sm mt-2">+ Create Product</NavLink>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            {/* Changed table classes to match the 'table-success table-striped' style from your Laravel code */}
            <table className="table table-success table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category Details</th> {/* Changed header to reflect multi-line content */}
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((p, i) => (
                    <tr key={p.id || i}> {/* Use p.id as key if available, otherwise fallback to index */}
                      <td scope="row">{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.description}</td>

                      {/* Show category name and ID on separate lines */}
                      <td>{getCategoryDetails(p.category_id)}</td>

                      <td>
                        {/* Actions group similar to Laravel example's btn-group, but using React components */}
                        <div className="btn-group" role="group">
                            {/* Assuming there's a view route, otherwise you might link to edit */}
                            <NavLink to={`/view-product/${p.id}`} className="btn btn-sm btn-info">View</NavLink>
                            {/* Changed button class to btn-warning as in Laravel example */}
                            <NavLink to={`/edit-product/${p.id}`} className="btn btn-sm btn-warning">Edit</NavLink>
                            {/* Changed button class to btn-danger as in Laravel example */}
                            <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">
                              Delete
                            </button>
                        </div>
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