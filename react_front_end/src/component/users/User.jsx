import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const User = () => {
  const [users, setUser] = useState([]);


  const deleteUser = async(id) =>{
    await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);

    fetchUser();
  }
  const fetchUser = async () => {
    try {
      const resource = await axios.get("http://127.0.0.1:8000/api/users");
      setUser(resource.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">User List</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    users.map((p, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{p.name} </td>
                                <td>{p.email} </td>
                                <td>{p.password} </td>
                                <td>
                                  <button onClick={() => deleteUser(p.id)} className="btn btn-danger mx-2"><i class="bi bi-trash3-fill"></i></button>
                                
                                        <NavLink to={`/edit-user/${p.id}`} className="btn btn-info mx-2"><i class="bi bi-pencil-square"></i></NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;