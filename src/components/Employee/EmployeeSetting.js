import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IoReturnDownBack } from "react-icons/io5";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SettingsBox = styled.div`
  width: 60%; 
  padding: 2%; 
  border: 2px solid #fbfbfb;
  border-radius: 1%; 
  background: transparent;
  box-shadow: 0 0.5% 2% rgba(0, 0, 0, 0.1); 
  text-align: center;
  animation: ${fadeIn} 0.5s;
  color: white;
  margin: 2% auto; 
  margin-right: 30%;
  box-sizing: border-box;
  background-color: rgb(7, 10, 92);
  overflow-y: auto;
  scrollbar-width: none;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%; 
`;

const HalfWidth = styled.div`
  width: 80%; 
  padding: 1%; 
  animation: ${slideIn} 0.3s ease forwards;
`;

const Button = styled.button`
  margin-left: 1%;
  width: 70%; 
  margin-bottom: 1%; 
  padding: 1%; 
  font-size: 1rem; 
  cursor: pointer;
  background-color: #dce1e7;
  color: black;
  border: none;
  border-radius: 0.5%; 
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordSection = styled.div`
  background-color: #f8f9fa;
  padding: 2%; 
  border: 1px solid #ced4da;
  border-radius: 0.5%; 
  margin-top: 2%;
  width: 100%;
    background-color: rgb(7, 10, 92);

`;

const Input = styled.input`
  width: calc(100% - 2%); 
  padding: 1%; 
  margin-bottom: 2%; 
  border: 1px solid #ced4da;
  border-radius: 0.5%; 
`;

const SuccessMessage = styled.div`
  margin-top: 2%; 
  padding: 1%; 
  background-color: #28a745;
  color: #fff;
  border-radius: 0.5%; 
`;

const BackButton = styled.button`
  margin-left: 1%;
  width: auto;
  padding: 1%; 
  font-size: 1rem; 
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5%; 
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditProfileSection = styled.div`
  margin-left: 10%; 
  width: 70%; 
  display: flex;
  flex-direction: column;
  margin-top: 2%; 
`;

const EditProfileImage = styled.img`
  margin-top: 2%; 
  border-radius: 50%;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const EmployeeSetting = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('John Doe');
  const [profileImage, setProfileImage] = useState('path/to/default/image.jpg');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  const handleToggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', { name, profileImage });
    navigate(-1);
  };

  const handlePrivacySettings = () => {
    console.log('Privacy settings clicked');
  };

  const handleShowHistory = () => {
    console.log('Show history clicked');
    const historyItems = ['History item 1', 'History item 2', 'History item 3'];
    setHistory(historyItems);
    setFilteredHistory(historyItems);
    setShowHistory(true);
  };

  const handleDeleteHistory = () => {
    console.log('Delete history clicked');
    setHistory([]);
    setFilteredHistory([]);
    setShowHistory(false);
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setShowPasswordSuccess(false);
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
    setShowPasswordSuccess(true);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBack = () => {
    navigate(0);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  };

  return (
    <SettingsBox>
      <div className="settings-container">
        <SettingsContent>
          {/* History Section */}
          {showHistory && (
            <HalfWidth>
              <div style={styles.passwordSection}>
                <h3>History:</h3>
                <Input
                  type="text"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <ul>
                  {filteredHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </HalfWidth>
          )}

          {/* Change Password Section */}
          <HalfWidth>
            <Button onClick={handleToggleChangePassword}>
              Change Password
            </Button>
          </HalfWidth>
          {showChangePassword && (
            <HalfWidth>
              <PasswordSection>
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button onClick={handleChangePassword}>
                  Save Password
                </Button>
                {showPasswordSuccess && (
                  <SuccessMessage>
                    Password updated successfully!
                  </SuccessMessage>
                )}
              </PasswordSection>
            </HalfWidth>
          )}
        </SettingsContent>
        
        <BackButton onClick={handleBack}>
          Back
        </BackButton>
      </div>
    </SettingsBox>
  );
};

export default EmployeeSetting;
