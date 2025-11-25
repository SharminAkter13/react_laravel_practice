import React, { useState, useEffect } from "react";
import axios from "axios";
import User from './User';
const AddUser = () => {
        const [users, setUsers] = useState([]);
    const [userField, setUserField] = useState({
        name: "",
          email: "",
        password: ""
    });

    // Handle input field change
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value,
        });
    };

    // Fetch users from the API
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Create a new User by sending data to the API
    const createUser = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/users", userField);
            fetchUser(); 
            setUserField({ name: "" }); 
        } catch (error) {
            console.error("Error creating User:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []); 

        const [loading,setLoading]=useState()
     const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/users", userField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <AddUser/>
    }



    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-info text-white">
                    <h4 className="mb-0">User List</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={createUser}>
                        <div className="mb-3 mt-3">
                            <label>User Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter User Name"
                                value={userField.name}
                                onChange={changeUserFieldHandler}
                                required
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label>User Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Enter User Email"
                                value={userField.email}
                                onChange={changeUserFieldHandler}
                                required
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label>User Password:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="password"
                                placeholder="Enter User Password"
                                value={userField.password}
                                onChange={changeUserFieldHandler}
                                required
                            />
                        </div>
                           <button type="submit" className="btn btn-success" onClick={e => onSubmitChange(e)}>Add User</button>

                    </form>
                </div>
                <div className="col-md-12 mt-4">
                    <User users={users} fetchUser={fetchUser} />
                </div>
            </div>
        </div>
    );
};


export default AddUser;