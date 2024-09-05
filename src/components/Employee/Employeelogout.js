import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isLogoutSuccessful, setIsLogoutSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...'); 
        setIsLogoutSuccessful(true);
        setTimeout(() => {
            navigate('/'); 
        }, 2000); 
    };

    const handleCancel = () => {
        navigate(0); 
    };

    const logoutBox = {
        background: 'transparent',
        padding: '2% 3%', 
        borderRadius: '8px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color: '#060606',
        border: '0.2% solid #fbfbfb',
        margin: '2% auto', 
        boxSizing: 'border-box',
        backgroundColor: '#2f30312f',
        marginRight: '0', 
        width: '50%', 
        marginLeft: '0',
        backgroundColor: 'rgb(7, 10, 92)',
    };

    const logoutTitle = {
        color: 'white',
    };

    const logoutMessage = {
        color: 'white',
    };

    const buttonGroup = {
        marginRight: '0', 
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        textDecoration: 'none',
    };

    const logoutButton = {
        width: 'fit-content',
        padding: '1%', 
        fontSize: '1em', 
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff', 
        border: 'none',
        borderRadius: '0.4%',
        transition: 'background-color 0.3s',
        marginRight: '0.5em', 
    };

    const cancelButton = {
        width: 'fit-content',
        padding: '1%', 
        fontSize: '1em', 
        cursor: 'pointer',
        backgroundColor: '#007bff', 
        color: '#fff', 
        border: 'none',
        borderRadius: '0.4%',
        transition: 'background-color 0.3s',
        marginLeft: '0.5em',
    };

    const logoutButtonHover = {
        backgroundColor: '#0056b3',
    };

    const cancelButtonHover = {
        backgroundColor: '#5a6268',
    };

    const logoutStatus = {
        marginTop: '1rem',
        color: 'green',
        fontWeight: 'bold',
    };

    return (
        <div className="logout-wrapper">
            <div style={logoutBox}>
                <h1 style={logoutTitle}>Confirm Logout</h1>
                <p style={logoutMessage}>Are you sure you want to logout?</p>
                <div style={buttonGroup}>
                    <button
                        style={logoutButton}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = logoutButtonHover.backgroundColor)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        style={cancelButton}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = cancelButtonHover.backgroundColor)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                {isLogoutSuccessful && <p style={logoutStatus}>Logout successful!</p>}
            </div>
        </div>
    );
};

export default Logout;
