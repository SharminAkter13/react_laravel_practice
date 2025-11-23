import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  // Helper to find category object by ID
  const getCategory = (id) => {
    return categories.find(c => c.id === id);
  };

  // 🔄 Function to group products by category ID
  const getGroupedProducts = (productsList) => {
    return productsList.reduce((acc, product) => {
      const categoryId = product.category_id;
      if (!acc[categoryId]) {
        // Initialize the array for a new category
        acc[categoryId] = [];
      }
      // Push the product into the corresponding category's array
      acc[categoryId].push(product);
      return acc;
    }, {});
  };

  const deleteProduct = async(id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      fetchProduct(); // Re-fetch data to update the table
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products");
      const productsData = res.data;
      setProducts(productsData);
      // Update grouped products immediately after fetching products
      setGroupedProducts(getGroupedProducts(productsData));
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
    fetchCategories();
    fetchProduct();
  }, []); // Run on component mount

  // 📝 IMPORTANT: Re-group products whenever the raw products or categories change
  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      setGroupedProducts(getGroupedProducts(products));
    }
  }, [products, categories]);

  // --- RENDERING LOGIC ---
  
  // Get an array of Category IDs that have products
  const categoryIds = Object.keys(groupedProducts);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Product List Grouped by Category</h4>
          <NavLink to={`/create-product`} className="btn btn-light btn-sm mt-2">+ Create Product</NavLink>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-success table-striped align-middle">
              <thead>
                <tr>
                  <th colSpan="5" className="text-start">Category</th>
                  <th className="text-center">Total Products</th>
                </tr>
              </thead>

              <tbody>
                {categoryIds.length > 0 ? (
                  categoryIds.map((categoryId) => {
                    const category = getCategory(parseInt(categoryId));
                    const productsInCategory = groupedProducts[categoryId];
                    const categoryName = category ? category.name : "Unknown Category";
                    
                    return (
                      <React.Fragment key={categoryId}>
                        {/* 1. Category Row (The main row) */}
                        <tr className="table-dark">
                          <td colSpan="5" className="fw-bold">
                            {categoryName} 
                            <small className="text-muted ms-2">(ID: {categoryId})</small>
                          </td>
                          <td className="text-center fw-bold">{productsInCategory.length}</td>
                        </tr>

                        {/* 2. Products Sub-Table Headers (Optional: makes product details clearer) */}
                        <tr className="table-secondary">
                          <th className="text-center" style={{ width: '5%' }}>#</th>
                          <th style={{ width: '20%' }}>Name</th>
                          <th style={{ width: '10%' }}>Price</th>
                          <th>Description</th>
                          <th colSpan="2" style={{ width: '20%' }}>Actions</th>
                        </tr>

                        {/* 3. Products Rows */}
                        {productsInCategory.map((p, productIndex) => (
                          <tr key={p.id} className="text-sm">
                            <td className="text-center">{productIndex + 1}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.description}</td>
                            
                            <td colSpan="2">
                              <div className="btn-group" role="group">
                                <NavLink to={`/view-product/${p.id}`} className="btn btn-sm btn-info">View</NavLink>
                                <NavLink to={`/edit-product/${p.id}`} className="btn btn-sm btn-warning">Edit</NavLink>
                                <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
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