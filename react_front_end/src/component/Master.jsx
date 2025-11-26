import React from 'react';
import Sidebar from './Sidebar'; 
import Footer from './Footer';
import Navbar from './Navbar';

const SIDEBAR_WIDTH = '250px';
const NAVBAR_HEIGHT = '60px'; 

const mainContainerStyle = {
    paddingTop: NAVBAR_HEIGHT, 
    marginLeft: SIDEBAR_WIDTH, 
    padding: '20px',
    minHeight: 'calc(100vh - 5px)', 
};

const Master = ({ children }) => {
    return (
        <div className="dashboard-wrapper">
            
            <div style={{ 
                position: 'fixed', 
                top: NAVBAR_HEIGHT,
                left: 0, 
                width: SIDEBAR_WIDTH, 
                height: `calc(100vh - ${NAVBAR_HEIGHT})`, 
                zIndex: 1000, 
            }}>
                <Navbar/>
                <Sidebar />
            </div>

            
            <div className="main-container mt-5" style={mainContainerStyle}>
                {children} 
            </div>

            <div className="footer-area" style={{ marginLeft: SIDEBAR_WIDTH }}>
                <Footer />
            </div>
            
        </div>
    );
};

export default Master;