import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white p-3 shadow-lg" style={{ width: '250px', height: '100%' }}>
            
            <div className="text-center mb-4 pt-3 pb-2 border-bottom">
                <h4 className="text-primary fw-bold">LoyaltyDev</h4>
                <small className="text-secondary">Admin Dashboard</small>
            </div>
            
            <ul className="nav flex-column">
                
                <li className="nav-item mb-1">
                    <Link className="nav-link text-white d-flex align-items-center rounded-3 active bg-secondary" to="/home">
                        <i className="bi bi-house-door-fill me-3"></i>Dashboard
                    </Link>
                </li>
                
                <li className="nav-item mb-1">
                    <Link className="nav-link text-white d-flex align-items-center rounded-3" to="/category">
                        <i className="bi bi-tags-fill me-3"></i>Categories
                    </Link>
                </li>
                
                <li className="nav-item mb-1">
                    <Link className="nav-link text-white d-flex align-items-center rounded-3" to="/product">
                        <i className="bi bi-box-seam-fill me-3"></i>Products
                    </Link>
                </li>
                
                <li className="nav-item mb-1">
                    <Link className="nav-link text-white d-flex align-items-center rounded-3" to="/user">
                        <i className="bi bi-people-fill me-3"></i>Users
                    </Link>
                </li>
                
                <li className="nav-item mt-5">
                    <hr className="bg-secondary" />
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link text-danger d-flex align-items-center rounded-3" to="/login">
                        <i className="bi bi-box-arrow-right me-3"></i>Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;