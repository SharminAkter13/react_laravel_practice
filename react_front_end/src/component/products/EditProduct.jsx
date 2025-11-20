import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Product from './Product';
const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [productField, setProductField] = useState({
        name: "",
        price: "",
        description: "",
        category_id: ""
    });

    // Fetch product and categories on mount
    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    // Fetch the product data
    const fetchProduct = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
            setProductField(result.data);
        } catch (err) {
            console.log("Error fetching product");
        }
    };

    // Fetch category list
    const fetchCategories = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/categories");
            setCategories(result.data);
        } catch (err) {
            console.log("Error fetching categories");
        }
    };

    // Input handler
    const changeProductFieldHandler = (e) => {
        setProductField({
            ...productField,
            [e.target.name]: e.target.value,
        });
    };

    // Update product
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/products/${id}`, productField);
            navigate('/products'); // redirect after update
        } catch (err) {
            console.log("Error updating product");
        }
    };

    const clickToBackHandler = () => {
        navigate('/add-product');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                    <h4 className="mb-0">Edit Product</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={onSubmitChange}>

                        <div className="mb-3">
                            <label className="form-label">Product Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={productField.name}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={productField.price}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={productField.description}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category:</label>
                            <select
                                className="form-control"
                                name="category_id"
                                value={productField.category_id}
                                onChange={changeProductFieldHandler}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update Product
                        </button>
                    </form>
                </div>

                <div className="card-footer text-center">
                    <button className="btn btn-secondary" onClick={clickToBackHandler}>
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProducts;
