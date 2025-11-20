import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from './component/products/Product';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [ProductField, setProductField] = useState({
        name: "",
        price: "",
        description: "",
        category_id: ""

    });
    const [loading, setLoading] = useState(false);

    // Handle input field change
    const changeProductFieldHandler = (e) => {
        setProductField({
            ...ProductField,
            [e.target.name]: e.target.value,
        });
    };

    // Fetch products from the API
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const fetchCategories = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(response.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};


    // Create a new Product by sending data to the API
    const createProduct = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the default way
        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/products", ProductField);
            fetchProduct(); // Re-fetch the updated Product list
            setProductField({ name: "" }); // Clear the input field after adding
        } catch (error) {
            console.error("Error creating Product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []); // This runs once when the component mounts

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Product List</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={createProduct}>
                        <div className="mb-3 mt-3">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter Product Name"
                                value={ProductField.name}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>
                        <div className="mb-3 mt-3">
                              price:
                                <input type="text" className="form-control" id="price" placeholder="Enter price" name="price" onChange={e => changeProductFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
                              Description:
                                <input type="text" className="form-control" id="password" placeholder="Enter description" name="description" onChange={e => changeProductFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
    <label>Category:</label>
    <select
        className="form-control"
        name="category_id"
        value={ProductField.category_id}
        onChange={changeProductFieldHandler}
        required
    >
        <option value="">Select Category</option>
        {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>
</div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </form>
                </div>
                <div className="col-md-10 mt-4">
                    <Product products={products} fetchProduct={fetchProduct} />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
