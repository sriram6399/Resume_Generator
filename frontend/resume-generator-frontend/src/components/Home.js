import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility state
  const [currentForm, setCurrentForm] = useState('Personal Info'); // Start with Personal Info as the default form
  const [editableForms, setEditableForms] = useState(['Personal Info']); // Track editable forms

  const forms = [
    'Personal Info',
    'Contact Info',
    'Professional Summary',
    'Employment History',
    'Skills',
    'Education',
  ];

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Display the appropriate form based on button click
  const showForm = (formName) => {
    setCurrentForm(formName); // Set the form to display
  };

  // Handle form submission
  const handleSubmit = () => {
    const currentIndex = forms.indexOf(currentForm);

    // If there's a next form, make it editable and navigate to it
    if (currentIndex < forms.length - 1) {
      const nextForm = forms[currentIndex + 1];
      setEditableForms([...editableForms, nextForm]); // Add next form to editable list
      setCurrentForm(nextForm); // Navigate to the next form
    }
  };

  // Enable form fields for editing
  const handleEdit = () => {
    if (!editableForms.includes(currentForm)) {
      setEditableForms([...editableForms, currentForm]); // Add current form to editable list
    }
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <span className="nav-title">Welcome to Resume Builder Hub</span>
        <button className="menu-icon" onClick={toggleSidebar}>
          &#9776; {/* Hamburger menu icon */}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-content">
          {forms.map((form) => (
            <button
              key={form}
              className="sidebar-button"
              onClick={() => showForm(form)}
            >
              {form}
            </button>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className={`form-container ${currentForm ? 'visible' : ''}`}>
        {currentForm === 'Personal Info' && (
          <div>
            <h2>Personal Info</h2>
            <form>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  disabled={!editableForms.includes('Personal Info')}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  disabled={!editableForms.includes('Personal Info')}
                />
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Personal Info')}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {currentForm === 'Contact Info' && (
          <div>
            <h2>Contact Info</h2>
            <form>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled={!editableForms.includes('Contact Info')}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  disabled={!editableForms.includes('Contact Info')}
                />
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Contact Info')}
              >
                Submit
              </button>
              <button
                className="edit-button"
                onClick={handleEdit}
                disabled={editableForms.includes('Contact Info')}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {currentForm === 'Professional Summary' && (
          <div>
            <h2>Professional Summary</h2>
            <form>
              <div className="form-group">
                <label>Summary:</label>
                <textarea
                  placeholder="Write your professional summary"
                  disabled={!editableForms.includes('Professional Summary')}
                ></textarea>
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Professional Summary')}
              >
                Submit
              </button>
              <button
                className="edit-button"
                onClick={handleEdit}
                disabled={editableForms.includes('Professional Summary')}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {currentForm === 'Employment History' && (
          <div>
            <h2>Employment History</h2>
            <form>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  disabled={!editableForms.includes('Employment History')}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <input
                  type="text"
                  placeholder="Enter your role"
                  disabled={!editableForms.includes('Employment History')}
                />
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Employment History')}
              >
                Submit
              </button>
              <button
                className="edit-button"
                onClick={handleEdit}
                disabled={editableForms.includes('Employment History')}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {currentForm === 'Skills' && (
          <div>
            <h2>Skills</h2>
            <form>
              <div className="form-group">
                <label>Programming Languages:</label>
                <input
                  type="text"
                  placeholder="Enter your skills"
                  disabled={!editableForms.includes('Skills')}
                />
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Skills')}
              >
                Submit
              </button>
              <button
                className="edit-button"
                onClick={handleEdit}
                disabled={editableForms.includes('Skills')}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {currentForm === 'Education' && (
          <div>
            <h2>Education</h2>
            <form>
              <div className="form-group">
                <label>Degree:</label>
                <input
                  type="text"
                  placeholder="Enter your degree"
                  disabled={!editableForms.includes('Education')}
                />
              </div>
              <div className="form-group">
                <label>Institution:</label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  disabled={!editableForms.includes('Education')}
                />
              </div>
              <div className="form-group">
                <label>Year of Graduation:</label>
                <input
                  type="text"
                  placeholder="Enter year of graduation"
                  disabled={!editableForms.includes('Education')}
                />
              </div>
            </form>
            <div className="action-buttons">
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!editableForms.includes('Education')}
              >
                Submit
              </button>
              <button
                className="edit-button"
                onClick={handleEdit}
                disabled={editableForms.includes('Education')}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
