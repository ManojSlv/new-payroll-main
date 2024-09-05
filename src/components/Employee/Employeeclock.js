import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAttendance } from '../../contexts/AttendanceContext';

const Atta = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayHistory, setDisplayHistory] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);

  const navigate = useNavigate();
  const { addClockIn, addClockOut, getAttendanceForDate } = useAttendance();

  useEffect(() => {
    const history = getAttendanceForDate(selectedDate);
    setDisplayHistory(history);
  }, [selectedDate, getAttendanceForDate]);

  useEffect(() => {
    if (clockedIn && startTime) {
      const intervalId = setInterval(() => {
        setEndTime(new Date());
        const totalSeconds = (new Date() - startTime) / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        setTotalHours(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [clockedIn, startTime]);

  const appStyle = {
    display: 'flex',
    textAlign: 'center',
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.089)',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    padding: '2%',
    borderRadius: '10px',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffffff',
    border: '2px solid #fbfbfb',
    boxSizing: 'border-box',
    backgroundColor: '#2f30312f',
    marginRight: '45%',
    height: '70vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
  };

  const appHeaderStyle = {
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  };

  const datePickerContainerStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '2%',
    right: '8%',
    width: '25%',
  };

  const clockInOutStyle = {
    marginTop: '40px',
    color: 'white',
  };

  const clockBtnStyle = {
    backgroundColor: clockedIn ? '#DC3545' : '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '15%', // 150px to %
    height: '15%', // 150px to %
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    position: 'relative',
    overflow: 'hidden',
  };

  const handleClockIn = () => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      if (displayHistory.some(entry => entry.type === 'Clock In')) {
        alert('You have already clocked in today.');
        return;
      }
      setClockedIn(true);
      const start = new Date();
      setStartTime(start);
      setEndTime(null);
      setTotalHours(null);
      addClockIn(start, start);
    }
  };

  const handleClockOut = () => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      if (!displayHistory.some(entry => entry.type === 'Clock In')) {
        alert('You need to clock in before you can clock out.');
        return;
      }
      if (displayHistory.some(entry => entry.type === 'Clock Out')) {
        alert('You have already clocked out today.');
        return;
      }
      setClockedIn(false);
      const end = new Date();
      setEndTime(end);
      const totalSeconds = (end - startTime) / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      setTotalHours(`${hours}h ${minutes}m ${seconds}s`);
      addClockOut(end, end);
    }
  };

  return (
    <div style={appStyle}>
      <div style={appHeaderStyle}>
        <h1>Attendance</h1>
        <div style={datePickerContainerStyle}>
          <span>📅</span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="date-picker" // You can keep some class-based styles
          />
        </div>
      </div>
      <div style={clockInOutStyle}>
        <button
          style={clockBtnStyle}
          onClick={clockedIn ? handleClockOut : handleClockIn}
        >
          {clockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>
    </div>
  );
};

export default Atta;
