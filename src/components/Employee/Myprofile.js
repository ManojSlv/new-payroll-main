import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "../../assets/profile.png";


  const profileContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    margin: '5% auto',
    padding: '2%',
    boxShadow: '0 0.5% 1.75% rgba(0, 0, 0, 0.1)',
    marginTop: '2%',
    height: '70vh',
    overflowY: 'auto',
    border: '0.15% solid #fbfbfb',
    borderRadius: '1%',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(7, 10, 92)',
    marginRight: '40%',
    scrollbarWidth: 'none'
  };
  const profileContent = {
    width: '100%',
    maxWidth: '100%',
    margin: '2% auto',
    padding: '2%',
    borderRadius: '0.8%'
  };
  const leftSection = {
    width: '100%'
  };
  const rightSection = {
    width: '100%'
  };
  const profileSection = {
    marginTop: '2%',
    marginBottom: '2%',
    padding: '2%',
    backgroundColor: '#ffffff',
    borderRadius: '0.8%',
    marginRight: '2%'
  };
  const sectionHeader= {
    paddingBottom: '1%',
    marginBottom: '1.5%',
    color: '#333',
    fontSize: '1.5em'
  };
  const inputGroup= {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1%'
  };
  const inputGroupLabel = {
    flex: '1',
    marginRight: '1%',
    color: '#333'
  };
  const inputGroupText = {
    flex: '2',
    margin: '0.5% 0',
    color: '#333',
    border: '0.1% solid #ccc',
    padding: '0.5%'
  };
  const profileImage = {
    display: 'flex',
    justifyContent: 'center'
  };
  const profileImageImg = {
    borderRadius: '50%',
    width: '10%',
    height: '10%',
    objectFit: 'cover',
    marginBottom: '2%'
  };
  const socialMedia = {
    padding: '0',
    listStyle: 'none'
  };
  const socialMediaLi = {
    margin: '0.5% 0'
  };
  const socialMediaLink= {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out'
  };
  const socialMediaLinkHover = {
    textDecoration: 'underline',
    color: '#0056b3'
  };
  const buttonGroup= {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'space-between'
  };
  const button= {
    padding: '1% 2%',
    border: 'none',
    borderRadius: '0.4%',
    fontSize: '70%',
    cursor: 'pointer'
  };
  const editButton= {
    backgroundColor: '#007bff',
    color: 'white'
  };
  const editButtonHover= {
    backgroundColor: '#0056b3'
  };
  const saveButton= {
    backgroundColor: '#28a745',
    color: 'white'
  };
  const saveButtonHover= {
    backgroundColor: '#218838'
  };
  const cancelButton= {
    backgroundColor: '#dc3545',
    color: 'white'
  };
  const cancelButtonHover= {
    backgroundColor: '#c82333'
  };
  const backButton= {
    backgroundColor: 'red',
    color: 'white'
  };
  const backButtonHover= {
    backgroundColor: '#5a6268'
  };

function EmployeeProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: 'John Doe',
    employeeId: '123456',
    emailId: 'john.doe@example.com',
    personalNumber: '9876543210',
    personalName: 'John Doe',
    bloodGroup: 'O+',
    nationality: 'American',
    state: 'California',
    permanentAddress: '1234 Elm Street, Springfield, CA',
    currentAddress: '5678 Oak Street, Springfield, CA',
    emergencyContact: {
      name: 'Jane Doe',
      mobileNumber: '1234567890',
      address: '1234 Elm Street, Springfield, CA',
      relation: 'Wife'
    },
    professionalBackground: {
      jobTitle: 'Software Engineer',
      companyName: 'Tech Company',
      educationQualification: 'B.Sc in Computer Science',
      certification: 'Certified Java Developer',
      skills: ['React', 'JavaScript', 'CSS'],
      socialMedia: {
        linkedin: 'https://www.linkedin.com/in/johndoe',
        twitter: 'https://www.twitter.com/johndoe'
      }
    }
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    if (section === 'emergencyContact' || section === 'professionalBackground') {
      setEmployeeInfo((prevInfo) => ({
        ...prevInfo,
        [section]: {
          ...prevInfo[section],
          [key]: value
        }
      }));
    } else {
      setEmployeeInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value
      }));
    }
  };

  const renderInput = (label, value, name) => (
    <div style={inputGroup}>
      <label style={inputGroupLabel}>{label}</label>
      {isEditing ? (
        <input type="text" name={name} value={value} onChange={handleChange} style={inputGroupText} />
      ) : (
        <p style={inputGroupText}>{value}</p>
      )}
    </div>
  );

  const renderNestedInput = (label, value, section, key) => (
    <div style={inputGroup}>
      <label style={inputGroupLabel}>{label}</label>
      {isEditing ? (
        <input type="text" name={`${section}.${key}`} value={value} onChange={handleChange} style={inputGroupText} />
      ) : (
        <p style={inputGroupText}>{value}</p>
      )}
    </div>
  );

  const handleBack = () => {
    navigate(0);
  };

  return (
    <div style={profileContainer}>
      <div style={profileContent}>
        <div style={leftSection}>
          <div style={rightSection}>
            <div style={profileImage}>
              <img src={img2} alt="Profile" style={profileImageImg} />
            </div>
          </div>

          <div style={profileSection}>
            <h1 style={sectionHeader}>About Information</h1>
            {renderInput('Full Name:', employeeInfo.fullName, 'fullName')}
            {renderInput('Employee ID:', employeeInfo.employeeId, 'employeeId')}
            {renderInput('Email ID:', employeeInfo.emailId, 'emailId')}
          </div>
          <div style={profileSection}>
            <h1 style={sectionHeader}>Personal Information</h1>
            {renderInput('Personal Number:', employeeInfo.personalNumber, 'personalNumber')}
            {renderInput('Personal Name:', employeeInfo.personalName, 'personalName')}
            {renderInput('Blood Group:', employeeInfo.bloodGroup, 'bloodGroup')}
            {renderInput('Nationality:', employeeInfo.nationality, 'nationality')}
            {renderInput('State:', employeeInfo.state, 'state')}
            {renderInput('Permanent Address:', employeeInfo.permanentAddress, 'permanentAddress')}
            {renderInput('Current Address:', employeeInfo.currentAddress, 'currentAddress')}
          </div>
          <div style={profileSection}>
            <h1 style={sectionHeader}>Emergency Contact Details</h1>
            {renderNestedInput('Contact Name:', employeeInfo.emergencyContact.name, 'emergencyContact', 'name')}
            {renderNestedInput('Mobile Number:', employeeInfo.emergencyContact.mobileNumber, 'emergencyContact', 'mobileNumber')}
            {renderNestedInput('Address:', employeeInfo.emergencyContact.address, 'emergencyContact', 'address')}
            {renderNestedInput('Relation:', employeeInfo.emergencyContact.relation, 'emergencyContact', 'relation')}
          </div>
          <div style={profileSection}>
            <h1 style={sectionHeader}>Professional Background</h1>
            {renderNestedInput('Job Title:', employeeInfo.professionalBackground.jobTitle, 'professionalBackground', 'jobTitle')}
            {renderNestedInput('Company Name:', employeeInfo.professionalBackground.companyName, 'professionalBackground', 'companyName')}
            {renderNestedInput('Education Qualification:', employeeInfo.professionalBackground.educationQualification, 'professionalBackground', 'educationQualification')}
            {renderNestedInput('Certification:', employeeInfo.professionalBackground.certification, 'professionalBackground', 'certification')}
            {renderNestedInput('Skills:', employeeInfo.professionalBackground.skills.join(', '), 'professionalBackground', 'skills')}
          </div>
          <div style={profileSection}>
            <h1 style={sectionHeader}>Social Media Links</h1>
            <ul style={socialMedia}>
              <li style={socialMediaLi}>
                <a href={employeeInfo.professionalBackground.socialMedia.linkedin} style={socialMediaLink}>
                  LinkedIn
                </a>
              </li>
              <li style={socialMediaLi}>
                <a href={employeeInfo.professionalBackground.socialMedia.twitter} style={socialMediaLink}>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div style={buttonGroup}>
            {isEditing ? (
              <>
                <button onClick={handleSaveClick} style={{ ...button, ...saveButton }}>Save</button>
                <button onClick={handleEditClick} style={{ ...button, ...cancelButton }}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditClick} style={{ ...button, ...editButton }}>Edit</button>
            )}
            <button onClick={handleBack} style={{ ...button, ...backButton }}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
