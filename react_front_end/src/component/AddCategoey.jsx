import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from './Category'; // Assuming Category component displays the list of categories.

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryField, setCategoryField] = useState({
        name: "",
    });

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

    // Create a new category by sending data to the API
    const createCategory = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/categories", categoryField);
            fetchCategory(); 
            setCategoryField({ name: "" }); 
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []); 

        const [loading,setLoading]=useState()
     const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/categories", categoryField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <AddCategory/>
    }



    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Category List</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={createCategory}>
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
                           <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Category</button>

                    </form>
                </div>
                <div className="col-md-12 mt-4">
                    <Category categories={categories} fetchCategory={fetchCategory} />
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
