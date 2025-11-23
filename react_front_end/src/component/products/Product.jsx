import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Product() {
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      fetchProduct();
    }
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

  // Group products by category
  const groupedProducts = categories.map((category) => {
    return {
      category,
      products: products.filter((p) => p.category_id === category.id),
    };
  });

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Product List</h4>
          <NavLink to={`/create-product`} className="btn btn-light btn-sm">
            + Create Product
          </NavLink>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-success table-striped align-middle">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Category</th>
                  <th>Products Details</th>
                </tr>
              </thead>

              <tbody>
                {groupedProducts.map(
                  (group, index) =>
                    group.products.length > 0 && (
                      <tr key={group.category.id}>
                        {/* CATEGORY COLUMN */}
                        <td>
                          <strong>{group.category.name}</strong>
                          <br />
                          <small className="text-muted">ID: {group.category.id}</small>
                        </td>

                        {/* PRODUCTS COLUMN */}
                        <td>
                          {group.products.map((p) => (
                            <div key={p.id} className="mb-3 p-2 border rounded bg-white">
                              <div>
                                <strong>Name:</strong> {p.name}
                              </div>
                              <div>
                                <strong>Description:</strong> {p.description}
                              </div>
                              <div>
                                <strong>Price:</strong> ${p.price}
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="mt-2">
                                <NavLink
                                  to={`/edit-product/${p.id}`}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  Edit
                                </NavLink>

                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    )
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
