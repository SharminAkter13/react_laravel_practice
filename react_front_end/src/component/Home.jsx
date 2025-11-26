// Home.jsx
import React from "react";
import Master from "./Master"; 

const Home = () => {
    return (
        // Wrap your home content inside Master
        <Master> 
            <div className="container-fluid py-3">
                <div className="p-5 bg-light text-center rounded shadow">
                    <h1>Welcome to the Dashboard</h1>
                    <p className="mt-3">
                        Manage your categories, products, and users easily.
                    </p>
                </div>
            </div>
        </Master>
    );
};

export default Home;