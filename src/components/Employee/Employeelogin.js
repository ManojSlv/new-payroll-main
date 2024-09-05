import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/icons8-google-logo-48.png';
import yourLogo from '../../assets/image (2).png';
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const EmployeeLoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log('Custom Login Success:', response);
    navigate('/employee');
  };

  const handleLoginFailure = (response) => {
    console.log('Custom Login Failed:', response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'user@example.com' && password === 'password123') {
      navigate('/employee');
    } else {
      setErrorMessage('Wrong password. Try again or click Forgot password to reset it.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const customloginpage ={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    backgroundImage: `url('../../assets/bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const customlogincontainer={
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '5%',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '30%',
    textAlign: 'center',
  };
  
  const customloginform = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  };

  const customformlogo = { marginBottom: '10%' };

  const customyourlogo = { width: '50%', marginBottom: '-20%' };

  const login = { color: '#333', marginBottom: '1.5rem', fontSize: '1.5rem' };

  const customerrormessage = { color: 'red', fontSize: '0.9rem', marginBottom: '1rem' };

  const customformgroup =  { width: '100%', marginBottom: '1rem', textAlign: 'left' };

  const emailemp = { fontSize: '0.9rem', color: '#555' };

  const custominputcontainer = { display: 'flex', alignItems: 'center', position: 'relative' };

  const custominputicon = { position: 'absolute', right: '10px', cursor: 'pointer' };

  const inputstyle={
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: '0.5rem',
    paddingRight: '30px',
  };

  const customformgrouppassword = { width: '100%', marginBottom: '1rem', textAlign: 'left' };

  const emailemppassword = { fontSize: '0.9rem', color: '#555' };

  const custominputcontainerpassword = { display: 'flex', alignItems: 'center', position: 'relative' };

  const requiredstyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: '0.5rem',
    paddingRight: '30px',
  };

  const custominputiconspan = { position: 'absolute', right: '10px', cursor: 'pointer' };

  const customforgotpasswordbutton = {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '-10px',
    alignSelf: 'flex-end',
    fontSize: '0.9rem',
    marginRight: '10%',
    width: '50%',
    marginLeft: '1%',
  };

  const customsigninbutton ={
    width: '70%',
    padding: '0.8rem',
    marginTop: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#564caf',
    color: 'white',
    transition: 'transform 0.3s, background-color 0.3s',
    fontSize: '1rem',
  };

  const custombuttongroup = { marginTop: '1rem', width: '70%', marginLeft: '10%' };

  const customgoogle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, border-color 0.3s',
  };

  const customgooglelogo = { width: '20px', height: '20px', marginRight: '5px' };

  return (
    <div style={customloginpage}>
      <div style={customlogincontainer}>
        <form style={customloginform} onSubmit={handleSubmit}>
          <div style={customformlogo}>
            <img src={yourLogo} alt="Your Logo" style={customyourlogo} />
          </div>
          <h1 style={login}>Employee Login</h1>
          {errorMessage && <p style={customerrormessage}>{errorMessage}</p>}
          <div style={customformgroup}>
            <label htmlFor="email" style={emailemp}>Email:</label>
            <div style={custominputcontainer}>
              <HiOutlineMailOpen style={custominputicon} />
              <input type="email" id="email" name="email" required style={inputstyle} />
            </div>
          </div>
          <div style={customformgrouppassword}>
            <label htmlFor="password" style={emailemppassword}>Password:</label>
            <div style={custominputcontainerpassword}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                required
                style={requiredstyle}
              />
              <span style={custominputiconspan} onClick={togglePasswordVisibility}>
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          <button type="button" style={customforgotpasswordbutton}>Forgot password?</button>
          <button type="submit" style={customsigninbutton}>Login</button>
          <div style={custombuttongroup}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={customgoogle}>
                  <img src={googleLogo} alt="Google Logo" style={customgooglelogo} />
                  Sign in with Google
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLoginPage;
