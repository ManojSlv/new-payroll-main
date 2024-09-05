import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from "react-icons/io5";

const EmployeeHelp = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(0);
    };

    const empHelpMenu = {
        width: '60%',
        margin: '4% auto',
        padding: '2%',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
        animation: 'empFadeIn 0.5s ease-in-out',
        textAlign: 'center',
        color: '#ffffff',
        boxSizing: 'border-box',
        backgroundColor: 'rgb(7, 10, 92)',
        marginRight: '30%',
        border: '2px solid #fbfbfb',
        height: 'auto',
    };

    const empHelpTitle = {
        textAlign: 'center',
        marginBottom: '2%',
        color: 'white',
        marginLeft: '0%',
    };

    const empHelpContact = {
        color: 'white',
        marginBottom: '1%',
    };

    const empContactInfo = {
        marginTop: '1%',
        background: '#FAFAFA',
        padding: '2%',
        borderRadius: '4px',
        border: '1px solid #eee',
        animation: 'empSlideIn 0.5s ease-in-out',
        color: '#333',
    };

    const empHelpList = {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    };

    const empHelpListItem = {
        marginBottom: '1%',
        fontSize: '1em',
        color: '#333',
    };

    const empBackButton = {
        marginTop: '2%',
        width: '20%',
        padding: '1%',
        background: '#0056B3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
    };

    const empBackButtonHover = {
        background: '#0C345E',
        transform: 'scale(1.05)',
        opacity: 0.9,
    };

    const empBackButtonActive = {
        background: '#083978',
        transform: 'scale(0.95)',
    };

    return (
        <div style={empHelpMenu}>
            <h2 style={empHelpTitle}>Help Menu</h2>
            <p style={empHelpContact}>Contact Information:</p>
            <div style={empContactInfo}>
                <ul style={empHelpList}>
                    <li style={empHelpListItem}>Company Email: syliqonsoftware.com</li>
                    <li style={empHelpListItem}>HR Email: hr@syliqonsoftware.com</li>
                    <li style={empHelpListItem}>Manager Email: manager@syliqonsoftware.com</li>
                    <li style={empHelpListItem}>Team Leader Email: teamleader@syliqon.com</li>
                </ul>
            </div>
            <button
                style={empBackButton}
                onMouseOver={(e) => Object.assign(e.target.style, empBackButtonHover)}
                onMouseOut={(e) => Object.assign(e.target.style, empBackButton)}
                onMouseDown={(e) => Object.assign(e.target.style, empBackButtonActive)}
                onMouseUp={(e) => Object.assign(e.target.style, empBackButtonHover)}
                onClick={handleBack}
            >
                Back
            </button>
        </div>
    );
};

export default EmployeeHelp;
