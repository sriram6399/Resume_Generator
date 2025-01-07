import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleNext = () => {
    if (step === 1 && formData.firstName && formData.lastName) {
      setStep(step + 1);
    } else {
      alert('Please fill out all fields in Step 1.');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      alert('Registration Successful!');
      // You can add API integration here to submit the data
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register">Create Your Account</h2>
      <div className="steps-container">
        <div className={`step ${step === 1 ? 'active' : ''}`}>
          <span>1</span> Basic Info
        </div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>
          <span>2</span> Details
        </div>
      </div>
      {step === 1 && (
        <form className="form-step">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="next-button" onClick={handleNext}>
            Next →
          </button>
        </form>
      )}
      {step === 2 && (
        <form className="form-step" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="button" className="back-button" onClick={handleBack}>
              ← Back
            </button>
            <button type="submit" className="register-button">
              Register ✔
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
