import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function Product() {
  const [products, setProduct] = useState([]);


  const deleteProduct = async(id) =>{
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);

    fetchProduct();
  }
  const fetchProduct = async () => {
    try {
      const resource = await axios.get("http://127.0.0.1:8000/api/products");
      setProduct(resource.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{p.name}</td>
                      <td><button onClick={() =>deleteProduct(p.id)}><i className="bi bi-trash3-fill"></i></button>
                       <NavLink to={`/edit/${p.id}`} className="btn btn-info mx-2"><i class="bi bi-pencil-square"></i></NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No products found
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

export default Product;
