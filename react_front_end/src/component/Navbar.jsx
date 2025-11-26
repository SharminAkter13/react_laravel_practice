import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                {/* Logo/Brand */}
                <a className="navbar-brand" href="/home">LoyaltyDev</a>

                {/* Toggler Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/category">Categories</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Products</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/user">Users</Link>
                        </li>

                        {/* Logout Button */}
                        <li className="nav-item">
                            <Link className="btn btn-light btn-sm ms-3" to="/login">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;