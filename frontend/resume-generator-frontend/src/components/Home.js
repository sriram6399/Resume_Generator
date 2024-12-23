import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // Controls navbar dropdown
  const [isFormVisible, setIsFormVisible] = useState(false); // Controls form visibility

  // Toggle Navbar Dropdown
  const toggleNavbar = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  // Toggle Form Visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div
        className={`nav-bar ${isNavbarExpanded ? 'expanded' : ''}`}
        onClick={toggleNavbar}
      >
        Welcome to Resume Builder Hub
        {isNavbarExpanded && (
          <button className="personal-info-button" onClick={toggleForm}>
            Personal Info
          </button>
        )}
      </div>

      {/* Form Section */}
      {isFormVisible && (
        <div className="form-container">
          <h2>Fill Your Personal Information</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" placeholder="Enter your phone number" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Work Experience:</label>
              <textarea placeholder="Describe your work experience" required />
            </div>
            <div className="form-group">
              <label>Programming Languages:</label>
              <input type="text" placeholder="e.g., JavaScript, Python" required />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
