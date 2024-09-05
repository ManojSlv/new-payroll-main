import React, { useState } from 'react';
import { useLeave } from '../../contexts/LeaveContext';
import axios from 'axios';

const LeaveApplication = () => {
  const { addLeaveRequest } = useLeave();
  const [formData, setFormData] = useState({
    leaveFromDate: '',
    leaveToDate: '',
    leaveType: '',
    reason: '',
    attachment: null,
  });

  const [leaveData, setLeaveData] = useState([]);
  const [remainingLeaves, setRemainingLeaves] = useState({
    sick: 10,
    casual: 10,
  });

  const totalLeaves = {
    sick: 10,
    casual: 10,
  };

  const [showMore, setShowMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leaveDays = calculateLeaveDays(formData.leaveFromDate, formData.leaveToDate);

    if (leaveDays <= 0) {
      alert("Invalid leave period");
      return;
    }

    addLeaveRequest({ ...formData, leaveDays });
    setLeaveData([...leaveData, { ...formData, leaveDays }]);

    if (formData.leaveType === 'sick') {
      setRemainingLeaves((prevLeaves) => ({
        ...prevLeaves,
        sick: prevLeaves.sick - leaveDays,
      }));
    } else if (formData.leaveType === 'casual') {
      setRemainingLeaves((prevLeaves) => ({
        ...prevLeaves,
        casual: prevLeaves.casual - leaveDays,
      }));
    }
    try {
      await axios.post('http://localhost:5000/send-leave-request', {
        email: 'pooja.vm9671@gmail.com',
        leaveType: formData.leaveType,
        leaveFromDate: formData.leaveFromDate,
        leaveToDate: formData.leaveToDate,
        reason: formData.reason,
      });
      alert('Leave request submitted and email sent to the manager.');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error submitting leave request. Please try again later.');
    }

    setFormData({
      leaveFromDate: '',
      leaveToDate: '',
      leaveType: '',
      reason: '',
      attachment: null,
    });
  };

  const handleBack = () => {
    // Handle the back button functionality here
  };

  const leaveApplicationAdmin = {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2%',
    backgroundColor: 'rgb(7, 10, 92)',
    height: '80vh',
    borderRadius: '2%',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    marginTop: '-2%',
    color: '#ffffff',
    border: '2px solid #fbfbfb',
    width: '70%',
  };

  const leaveFormContainer = {
    width: '50%',
    border: '1px solid #ddd',
    padding: '2%',
    borderRadius: '1%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    height: '100%',
    marginRight: '2%',
    marginTop: '-2%',
    color: '#ffffff',
  };

  const leaveForm = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: '#fffe',
  };

  const leaveInfoContainer = {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2%',
    marginTop: '-2%',
    overflowY: 'auto',
    color: 'black',
    scrollbarWidth: 'none',
  };

  const remainingLeavescontainer = {
    border: '1px solid #ddd',
    padding: '2%',
    borderRadius: '1%',
    marginLeft: '5%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2%',
  };

  const leaveOverview = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2%',
  };

  const leaveEntitlement = {
    width: '40%',
    padding: '2%',
    backgroundColor: '#fff',
    borderRadius: '2%',
    textAlign: 'center',
    color: '#070707',
  };

  const leaveInfo = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const leaveAvailability = {
    border: '1px solid #ddd',
    padding: '2%',
    borderRadius: '1%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginLeft: '5%',
  };

  const leaveTypes = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const leaveType = {
    textAlign: 'center',
    width: '40%',
    padding: '2%',
    backgroundColor: '#f0f0f0',
    borderRadius: '1%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
   
  const leaveTypeTitle = {
    margin: 0,
    fontSize: '16px',
    color: '#000',
  };

  const leaveDays = {
    fontSize: '24px',
    margin: '2% 0',
    color: '#070707',
  };

  const buttonApply = {
  backgroundColor: 'green', 
  color: 'white', 
  padding: '1% 2%', 
  border: 'none', 
  borderRadius: '1%',
  cursor: 'pointer', 
  fontSize: '16px', 
  marginRight: '5%', 
  textAlign: 'center',
  };

  const leaveTable = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const leaveTableCell = {
    padding: '2%',
    border: '1px solid #ddd',
    textAlign: 'left',
    color: 'black',
  };

  const leaveTableHeader = {
    color: '#fffe',
    backgroundColor: '#2f30312f',
  };


  return (
    <div style={leaveApplicationAdmin}>
      <div style={leaveFormContainer}>
        <h1 style={{ color: 'rgb(255, 255, 255)' }}>Leave Application</h1>
        <form style={leaveForm} onSubmit={handleSubmit}>
          <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', textAlign: 'left' }}>
            Type of leave
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              style={{ padding: '8px', fontSize: '14px', marginTop: '5px', backgroundColor: '#ffffff66' }}
            >
              <option value="" disabled>Select leave type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', textAlign: 'left' }}>
            Leave from date
            <input
              type="date"
              name="leaveFromDate"
              value={formData.leaveFromDate}
              onChange={handleInputChange}
              style={{ padding: '8px', fontSize: '14px', marginTop: '5px', backgroundColor: '#ffffff66' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', textAlign: 'left' }}>
            Leave to date
            <input
              type="date"
              name="leaveToDate"
              value={formData.leaveToDate}
              onChange={handleInputChange}
              style={{ padding: '8px', fontSize: '14px', marginTop: '5px', backgroundColor: '#ffffff66' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', textAlign: 'left' }}>
            Reason of leave
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              style={{ padding: '8px', fontSize: '14px', marginTop: '5px', backgroundColor: '#ffffff66' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', textAlign: 'left' }}>
            Attach File
            <input type="file" onChange={handleFileChange} style={{ padding: '8px', fontSize: '14px', marginTop: '5px', backgroundColor: '#ffffff66' }} />
          </label>
          <div>
            <button style={buttonApply} type="submit">Apply Leave</button>
          </div>
        </form>
      </div>
      <div style={leaveInfoContainer}>
        <div style={remainingLeavescontainer}>
          <h1 style={{ color: 'rgb(255, 255, 255)' }}>Your Overview</h1>
          <div style={leaveOverview}>
            <div style={leaveEntitlement}>
              <h3 style={{ color: '#000' }}>Total Leaves</h3>
              <p style={leaveDays}>{totalLeaves.sick + totalLeaves.casual}</p>
            </div>
            <div style={leaveEntitlement}>
              <h3 style={{ color: '#000' }}>Remaining Leaves</h3>
              <p style={leaveDays}>{remainingLeavescontainer.sick + remainingLeavescontainer.casual}</p>
            </div>
          </div>
          <button className="view-more-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'View Less' : 'View More'}
          </button>
        </div>
        {showMore && (
          <div style={leaveAvailability}>
            <h1 style={{ color: 'rgb(255, 255, 255)' }}>Leave Availability</h1>
            <div style={leaveTypes}>
              <div style={leaveType}>
                <h3 style={leaveTypeTitle}>Sick Leaves</h3>
                <p className="leave-total">Total: {totalLeaves.sick}</p>
                <p className="leave-remaining">Remaining: {remainingLeavescontainer.sick}</p>
              </div>
              <div style={leaveType}>
                <h3 style={leaveTypeTitle}>Casual Leaves</h3>
                <p className="leave-total">Total: {totalLeaves.casual}</p>
                <p className="leave-remaining">Remaining: {remainingLeavescontainer.casual}</p>
              </div>
            </div>
          </div>
        )}
        <div style={leaveInfo}>
          <h1 style={{ color: 'rgb(255, 255, 255)' }}>Leave Information</h1>
          <table style={leaveTable}>
            <thead>
              <tr>
                <th style={leaveTableHeader}>Type of leave</th>
                <th style={leaveTableHeader}>Start Date</th>
                <th style={leaveTableHeader}>End Date</th>
                <th style={leaveTableHeader}>Reason</th>
                <th style={leaveTableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave, index) => (
                <tr key={index}>
                  <td style={leaveTableCell}>{leave.leaveType}</td>
                  <td style={leaveTableCell}>{leave.leaveFromDate}</td>
                  <td style={leaveTableCell}>{leave.leaveToDate}</td>
                  <td style={leaveTableCell}>{leave.reason}</td>
                  <td style={leaveTableCell}>Pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
