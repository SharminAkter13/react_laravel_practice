import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from './Category'; 
import Master from "./Master"; // <-- Import Master

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryField, setCategoryField] = useState({
        name: "",
    });

    const [loading,setLoading]=useState(false); // Initialize loading state

    // Handle input field change
    const changeCategoryFieldHandler = (e) => {
        setCategoryField({
            ...categoryField,
            [e.target.name]: e.target.value,
        });
    };

    // Fetch categories from the API
    const fetchCategory = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Create a new category and handle submission
    const onSubmitChange = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        try {
            // Note: The original file had two calls to post, this logic is consolidated.
            await axios.post("http://127.0.0.1:8000/api/categories", categoryField);
            
            // Success: clear form and refresh list
            setCategoryField({ name: "" });
            fetchCategory(); 

        } catch (err) {
            console.log("Something Went Wrong or Error creating category:", err);
        } finally {
             // Stop loading state
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []); 

    // The redirect logic using state in the original file is usually handled by react-router-dom,
    // but preserving the spirit of your original component structure.
    if(loading){
        // You might replace this with a spinning loader component
        return (
            <Master>
                <div className="text-center mt-5">
                    <h3>Adding Category...</h3>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Master>
        );
    }


    return (
        <Master> {/* <-- Wrap the content with the Master layout */}
            <div className="container-fluid mt-3"> {/* container-fluid to fit Master layout */}
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Add New Category</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmitChange}>
                            <div className="mb-3 mt-3">
                                <label>Category Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Category Name"
                                    value={categoryField.name}
                                    onChange={changeCategoryFieldHandler}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Category</button>
                        </form>
                    </div>
                    {/* The list is displayed below the form, as per your original file structure */}
                    <div className="col-md-12 mt-4">
                        <Category categories={categories} fetchCategory={fetchCategory} />
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default AddCategory;