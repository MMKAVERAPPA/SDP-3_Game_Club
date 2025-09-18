import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
            <Link to="/" style={{ margin: '10px', color: 'white' }}>Home</Link>
            <Link to="/login" style={{ margin: '10px', color: 'white' }}>Login</Link>
            <Link to="/admin" style={{ margin: '10px', color: 'white' }}>Admin Dashboard</Link>
            <Link to="/membership-creation" style={{ margin: '10px', color: 'white' }}>Membership Creation</Link>
            <Link to="/member-search" style={{ margin: '10px', color: 'white' }}>Member Search</Link>
            <Link to="/member-details" style={{ margin: '10px', color: 'white' }}>Member Details</Link>
            <Link to="/add-game" style={{ margin: '10px', color: 'white' }}>Add Game</Link>
            <Link to="/collections" style={{ margin: '10px', color: 'white' }}>Collections</Link>
        </nav>
    );
}

export default Navbar;
