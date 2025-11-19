import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryField, setCategoryField] = useState({
        name: "",
    });

    useEffect(() => {
        fetchCategory();
    }, [id]);

    const fetchCategory = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
            setCategoryField(result.data);
        } catch (err) {
            console.log("Error fetching category");
        }
    };

    const changeCategoryFieldHandler = (e) => {
        setCategoryField({
            ...categoryField,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, categoryField);
            navigate('/');
        } catch (err) {
            console.log("Error updating category");
        }
    };

    const clickToBackHandler = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                    <h4 className="mb-0">Edit Category</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={onSubmitChange}>
                        
                        <div className="mb-3">
                            <label className="form-label">ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                disabled
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                name="name"
                                value={categoryField.name}
                                onChange={changeCategoryFieldHandler}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update Category
                        </button>
                    </form>
                </div>

                <div className="card-footer text-center">
                    <button className="btn btn-secondary" onClick={clickToBackHandler}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
