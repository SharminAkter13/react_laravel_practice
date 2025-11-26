import React from 'react';

const Footer = () => {
    return (
        <div>
             {/* FOOTER */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p className="mb-0">© {new Date().getFullYear()} LoyaltyDev. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;