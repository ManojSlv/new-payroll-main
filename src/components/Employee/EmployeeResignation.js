import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusPage from './EmployeeStatusPage';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBackSharp } from "react-icons/io5";
import { SiStatuspage } from "react-icons/si";

function EmployeeResignation() {
  const [name] = useState('John Doe');
  const [id] = useState('123456');
  const [reasonForLeaving, setReasonForLeaving] = useState('');
  const [domain, setDomain] = useState('');
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    if (showStatusPage) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
          setStatus(response.data.status);
        } catch (error) {
          console.error('Error checking status:', error);
          toast.error('Failed to check status');
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showStatusPage, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-resignation', {
        name,
        id,
        domain,
        reason: reasonForLeaving,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Resignation submitted successfully.');
      setStatus('submitted');
      setShowStatusPage(true);
    } catch (error) {
      toast.error('Failed to submit resignation.');
      console.error('Error submitting resignation:', error);
    }
  };

  const handleDiscussWithManager = async () => {
    try {
      await axios.post('http://localhost:5000/send-discussion-notification', {
        name,
        id,
        managerEmail: 'sharathachar55@gmail.com'
      });

      toast.success('Notification sent to manager for discussion.');
    } catch (error) {
      toast.error('Failed to send notification.');
      console.error('Error sending notification:', error);
    }
  };

  const handleBack = () => {
    navigate(0);
  };

  const handleStatusCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/check-status?id=${id}`);
      setStatus(response.data.status);
      setShowStatusPage(true); 
      toast.success('Status updated.');
    } catch (error) {
      toast.error('Failed to check status.');
      console.error('Error checking status:', error);
    }
  };

  const formContainer = {
    width: '70%',
    margin: 'auto',
    padding: '2%',
    boxShadow: '0 0.5% 2% rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5%',
    backgroundColor: '#2f30312f',
    color: '#060606',
    border: '0.2% solid #fbfbfb',
    boxSizing: 'border-box',
    marginRight: '30%',
    backgroundColor: 'rgb(7, 10, 92)'
  };

  const thg = {
    marginLeft: '2%',
    color: '#fff'
  };

  const employeeDetails = {
    marginBottom: '2%',
    width: '90%',
    padding: '1%',
    backgroundColor: '#e9ecef',
    borderRadius: '0.5%',
    textAlign: 'center',
    marginLeft: '1%'
  };

  const formGroup = {
    marginBottom: '2%',
    marginLeft: '2%',
    color: '#fff'
  };

  const textarea = {
    width: '93%',
    padding: '1%',
    border: 'none',
    borderRadius: '0.5%',
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa'
  };

  const formButtons = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1%'
  };

  const button = {
    display: 'inline-block',
    padding: '0.5% 0.5%',
    fontSize: '1rem',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5%',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none'
  };

  const buttonSubmit = {
    marginTop: '2%',
    backgroundColor: '#4369e7',
    flex: '1' 
  };

  const buttonBack = {
    marginTop: '2%',
    backgroundColor: 'transparent', 
    color: '#e6e9ec', 
    border: 'none', 
    fontSize: '1.5rem',
    flex: '1' 
  };

  const buttonDiscuss = {
    marginTop: '2%',
    backgroundColor: 'yellowgreen',
    flex: '1'
  };

  const statusCheckIcon = {
    position: 'absolute',
    marginTop: '2%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#dde1e6'
  };

  const statusCheckIconHover = {
    color: '#0056b3'
  };

  const h2 = {
    marginBottom: '2%',
    color: 'white',
    textAlign: 'center'
  }; 

  const p = {
    margin: '0.5% 0',
    color: '#333'
  }; 

  const discussContainer = {
    marginTop: '1%'
  };

  return (
    <div className="resignation-container1">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!showStatusPage ? (
        <div style={formContainer}>
          <div
            style={statusCheckIcon}
            onClick={handleStatusCheck}
            onMouseOver={(e) => e.currentTarget.style.color = statusCheckIconHover.color}
            onMouseOut={(e) => e.currentTarget.style.color = statusCheckIcon.color}
          >
            <SiStatuspage />
          </div>
          <h2 style={thg}>Resignation Application Form</h2>
          
          <div style={employeeDetails}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>ID Number:</strong> {id}</p>
          </div>
        
          <form onSubmit={handleSubmit}>
            <div style={formGroup}>
              <h3><label htmlFor="reasonForLeaving">Reason for Leaving:</label></h3>
              <textarea
                id="reasonForLeaving"
                style={textarea}
                value={reasonForLeaving}
                onChange={(e) => setReasonForLeaving(e.target.value)}
                required
              />
            </div>

            <div style={formButtons}>
              <button type="button" style={{ ...button, ...buttonDiscuss }} onClick={handleDiscussWithManager}>Discuss with Manager</button>
              <button type="button" style={{ ...button, ...buttonBack }} onClick={handleBack}><IoReturnDownBackSharp /></button>
              <button type="submit" style={{ ...button, ...buttonSubmit }}>Proceed</button>
            </div>
          </form>
        </div>
      ) : (
        <StatusPage name={name} id={id} status={status} />
      )}
    </div>
  );
}

export default EmployeeResignation;
