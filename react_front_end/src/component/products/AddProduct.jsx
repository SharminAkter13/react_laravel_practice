import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from './Product';


const AddProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [productField, setProductField] = useState({
        name: "",
        price: "",
        description: "",
        category_id: ""
    });


    // Input handler
    const changeProductFieldHandler = (e) => {
        setProductField({
            ...productField,
            [e.target.name]: e.target.value,
        });
    };

    // Fetch products
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Create product
    const createProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://127.0.0.1:8000/api/products", productField);
            fetchProduct();

            // Clear form
            setProductField({
                name: "",
                price: "",
                description: "",
                category_id: ""
            });

        } catch (error) {
            console.error("Error creating Product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, []);

    const [loading,setLoading]=useState()
     const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/products", productField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <AddProduct/>
    }

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
                                value={productField.name}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label>Price:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                placeholder="Enter price"
                                value={productField.price}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label>Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter description"
                                value={productField.description}
                                onChange={changeProductFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label>Category:</label>
                            <select
                                className="form-control"
                                name="category_id"
                                value={productField.category_id}
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

                        <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add product</button>
                    </form>
                </div>

                <div className="col-md-12 mt-4">
                    <Product products={products} fetchProduct={fetchProduct} />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
