import React, { useState, useEffect, useRef } from 'react';
import { IoIosPersonAdd } from "react-icons/io";
import { RiArrowDropDownLine, RiLogoutCircleFill } from "react-icons/ri";
import { FaHandsHelping, FaPrescription } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import img1 from "../../assets/S.jpg"; // Your logo image
import img2 from "../../assets/profile.png"; // Your profile image


const body = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundSize: '100%',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const navbar = {
  display: 'flex',
  backgroundColor: 'rgb(7, 10, 92)',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
};

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
};

const logo = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const homeButtonContainer = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '60%',
};

const homeButton = {
  background: 'none',
  padding: '0',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const homeButtonImage = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const homeButtonHover = {
  backgroundColor: 'green', 
};

const homeButtonActive = {
  transform: 'scale(0.98)',
};

const nav = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  justifyContent: 'space-between',
};

const profileIcon = {
  position: 'relative',
  cursor: 'pointer',
};

const profileImage = {
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  marginRight: '20px',
  marginTop: '5px',
};

const profileDropdown = {
  position: 'absolute',
  top: '100px',
  right: '0',
  fontSize: '25px',
  borderRadius: '5px',
  zIndex: 1000,
  backgroundColor: 'rgb(7, 10, 92)',
  padding: '10px',
};

const profileItem = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  backgroundColor: 'rgb(7, 10, 92)',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
};

const profileItemHover = {
  color: 'rgb(35, 178, 245)',
  transform: 'scale(1.05)',
};

const icon = {
  fontSize: '30px',
};

const dropdownIcon = {
  color: 'white',
  fontSize: '50px',
  cursor: 'pointer',
  textDecoration: 'none',
  marginRight: '25px',
};

const dropdownLabel = {
  color: '#ddd',
  fontSize: '25px',
  marginRight: '25px',
};

const ticketIcon = {
  position: 'relative',
  cursor: 'pointer',
};

const ticketText = {
  display: 'flex',
  alignItems: 'center',
};

const ticketDropdown = {
  position: 'absolute',
  fontSize: '25px',
  borderRadius: '5px',
  backgroundColor: '#2f30312f',
  width: '80%',
};

const ticketItem = {
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  backgroundColor: 'rgb(7, 10, 92)',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  width: '80%',
  textAlign: 'center',
  marginLeft: '10%',
};

const clockIn = {
  width: '50px',
  height: '50px',
  cursor: 'pointer',
  marginRight: '50px',
  marginTop: '8px',
};

const clockInIcon = {
  width: '100%',
  height: '100%',
};

const EmployeeNavBar = ({ onButtonClick, onHomeClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState({
    profile: false,
    ticket: false,
  });

  const dropdownRefs = {
    profile: useRef(null),
    ticket: useRef(null),
  };

  const toggleDropdown = (type) => {
    setDropdownVisible(prev => ({
      ...prev,
      [type]: !prev[type],
      ...Object.keys(dropdownVisible).reduce((acc, key) => {
        if (key !== type) acc[key] = false;
        return acc;
      }, {}),
    }));
  };

  const handleOutsideClick = (event) => {
    Object.keys(dropdownRefs).forEach(key => {
      if (dropdownVisible[key] && dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
        setDropdownVisible(prev => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <nav style={navbar}>
      <div style={logoContainer}>
        <img src={img1} alt="Logo" style={logo} />
      </div>

      <div style={homeButtonContainer}>
        <button
          style={homeButton}
          onClick={onHomeClick}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').style.backgroundColor = 'green'}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').style.backgroundColor = 'transparent'}
          onMouseDown={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
        >
          <img
            src="https://img.icons8.com/?size=100&id=84005&format=png&color=FFFFFF"
            alt="Home"
            style={homeButtonImage}
          />
        </button>
      </div>

      <div style={nav}>
        <div
          style={ticketIcon}
          onClick={() => toggleDropdown('ticket')}
          ref={dropdownRefs.ticket}
        >
          <div style={ticketText}>
            <p style={dropdownLabel}>Raise Tickets</p>
            <RiArrowDropDownLine style={dropdownIcon} />
          </div>
          {dropdownVisible.ticket && (
            <div style={ticketDropdown}>
              <div style={ticketItem} onClick={() => onButtonClick('raiseticket')}>
                Raise Ticket
              </div>
            </div>
          )}
        </div>

        <div style={clockIn} onClick={() => onButtonClick('clockin')}>
          <img
            src="https://img.icons8.com/?size=100&id=82767&format=png&color=FFFFFF"
            alt="Clock In"
            style={clockInIcon}
          />
        </div>

        <div
          style={profileIcon}
          onClick={() => toggleDropdown('profile')}
          ref={dropdownRefs.profile}
        >
          <img src={img2} alt="Profile" style={profileImage} />
          {dropdownVisible.profile && (
            <div style={profileDropdown}>
              <button
                style={profileItem}
                onClick={() => onButtonClick('myProfile')}
              >
                <IoIosPersonAdd style={icon} />
                My Profile
              </button>
              <button
                style={profileItem}
                onClick={() => onButtonClick('employeeresignation')}
              >
                <FaPrescription style={icon} />
                Resignation
              </button>
              <button
                style={profileItem}
                onClick={() => onButtonClick('employeesetting')}
              >
                <IoSettings style={icon} />
                Settings
              </button>
              <button
                style={profileItem}
                onClick={() => onButtonClick('employeehelp')}
              >
                <FaHandsHelping style={icon} />
                Help
              </button>
              <button
                style={profileItem}
                onClick={() => onButtonClick('employeelogout')}
              >
                <RiLogoutCircleFill style={icon} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavBar;
