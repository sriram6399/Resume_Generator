import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility state
  const [currentForm, setCurrentForm] = useState(null); // Start with Personal Info as the default form
  const [editableForms, setEditableForms] = useState(['Personal Info']); // Track editable forms
  const [unlockedForms, setUnlockedForms] = useState(['Personal Info']);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
   // Profile dropdown visibility
   const [searchFilters, setSearchFilters] = useState({
    job_title: '',
    location: '',
    company: '',
    skills: '',
    work_type: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const forms = [
    'Personal Info',
    'Contact Info',
    'Professional Summary',
    'Employment History',
    'Skills',
    'Education',
  ];
  const [employmentHistory, setEmploymentHistory] = useState([
    { company: '', role: '', startDate: '', endDate: '' },
  ]);
  const [educationHistory, setEducationHistory] = useState([
    { institution: '', degree: '', startDate: '', endDate: '' },
  ]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5001/search', {
        params: searchFilters,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  // Display the appropriate form based on button click
  const showForm = (formName) => {
    if (unlockedForms.includes(formName)) {
    setCurrentForm(formName);
    }
     // Set the form to display

  };

  // Handle form submission
  const handleSubmit = () => {
    const currentIndex = forms.indexOf(currentForm);

    // If there's a next form, make it editable and navigate to it
    if (currentIndex < forms.length - 1) {
      const nextForm = forms[currentIndex + 1];
      setEditableForms([...editableForms, nextForm]);
       // Add next form to editable list
      setUnlockedForms([...unlockedForms, nextForm]); 
      setCurrentForm(nextForm); // Navigate to the next form
    }
  };
  // dynamic forms handling
  const handleEmploymentChange = (index, field, value) => {
    const updatedHistory = [...employmentHistory];
    updatedHistory[index][field] = value;
    setEmploymentHistory(updatedHistory);
  };
  
  const addEmployment = () => {
    setEmploymentHistory([
      ...employmentHistory,
      { company: '', role: '', startDate: '', endDate: '' },
    ]);
  };
  
  const removeEmployment = (index) => {
    const updatedHistory = employmentHistory.filter((_, i) => i !== index);
    setEmploymentHistory(updatedHistory);
  };
  
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...educationHistory];
    updatedEducation[index][field] = value;
    setEducationHistory(updatedEducation);
  };
  
  const addEducation = () => {
    setEducationHistory([
      ...educationHistory,
      { institution: '', degree: '', startDate: '', endDate: '' },
    ]);
  };
  
  const removeEducation = (index) => {
    const updatedEducation = educationHistory.filter((_, i) => i !== index);
    setEducationHistory(updatedEducation);
  };

  // Enable form fields for editing
  const handleEdit = () => {
    if (!editableForms.includes(currentForm)) {
      setEditableForms([...editableForms, currentForm]); // Add current form to editable list
    }
  };
  const handleLogout = () => {
    // Clear authentication or user session data
    localStorage.removeItem('authToken'); // Example: Clear token
    console.log("User logged out");

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
      <span className="nav-title">
        <span>Welcome</span>&nbsp;
        <span>to</span>&nbsp;
        <span>Resume</span>&nbsp;
        <span>Builder</span>&nbsp;
        <span>Hub</span>
      </span>
      <div className="nav-buttons">
      <Link to="/" className="login-button-home">
      LOGIN
    </Link>
    <button className="menu-icon" onClick={toggleSidebar}>
      {isSidebarVisible ? '×' : '☰'} {/* Display X if sidebar is visible, else hamburger */}
    </button>
    <div className="profile-dropdown">
            <button className="profile-icon" onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}>
              👤 {/* Profile Icon */}
            </button>
            {profileDropdownVisible && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                <Link to="/profile" className="dropdown-item">My Profile</Link>
              </div>
            )}
          </div>
    
  </div>
</div>
       {/* Search Section */}
       <div className="search-container">
        <input
          type="text"
          placeholder="Job Title"
          value={searchFilters.job_title}
          onChange={(e) => setSearchFilters({ ...searchFilters, job_title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={searchFilters.location}
          onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={searchFilters.company}
          onChange={(e) => setSearchFilters({ ...searchFilters, company: e.target.value })}
        />
         <input
    type="text"
    placeholder="Skills"
    value={searchFilters.skills}
    onChange={(e) => setSearchFilters({ ...searchFilters, skills: e.target.value })}
  />
  <select
    value={searchFilters.work_type}
    onChange={(e) => setSearchFilters({ ...searchFilters, work_type: e.target.value })}
    className="work-type-select"
  >
    <option value="">Work Type</option>
    <option value="full-time">Full-Time</option>
    <option value="part-time">Part-Time</option>
    <option value="remote">Remote</option>
    <option value="freelance">Freelance</option>
  </select>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <div className="results-container">
          {searchResults.map((result) => (
            <div key={result.id} className="result-card">
              <h3>{result.name}</h3>
              <p>{result.job_title} at {result.company}</p>
              <p>{result.location}</p>
            </div>
          ))}
        </div>
      )}
    


     

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-content">
          {forms.map((form) => (
            <button
              key={form}
              className="sidebar-button"
              onClick={() => showForm(form)}
              disabled={!unlockedForms.includes(form)} 
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
      {employmentHistory.map((job, index) => (
        <div key={index} className="form-group employment-section">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={job.company}
            onChange={(e) =>
              handleEmploymentChange(index, 'company', e.target.value)
            }
            disabled={!editableForms.includes('Employment History')}
          />
          <label>Role:</label>
          <input
            type="text"
            placeholder="Enter your role"
            value={job.role}
            onChange={(e) =>
              handleEmploymentChange(index, 'role', e.target.value)
            }
            disabled={!editableForms.includes('Employment History')}
          />
          <label>Start Date:</label>
          <input
            type="date"
            value={job.startDate}
            onChange={(e) =>
              handleEmploymentChange(index, 'startDate', e.target.value)
            }
            disabled={!editableForms.includes('Employment History')}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={job.endDate}
            onChange={(e) =>
              handleEmploymentChange(index, 'endDate', e.target.value)
            }
            disabled={!editableForms.includes('Employment History')}
          />
          <div className="inline-buttons">
            <button
              type="button"
              onClick={() => removeEmployment(index)}
              className="remove-icon"
              title="Remove"
            >
              🗑️
            </button>
            <div className="add-button-container">
            <button
              type="button"
              onClick={addEmployment}
              className="add-icon"
              title="Add Employment"
            >
              Add Employment ➕
            </button>
            </div>
          </div>
        </div>
      ))}
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
    </form>
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
      {educationHistory.map((education, index) => (
        <div key={index} className="form-group education-section">
          <label>Institution:</label>
          <input
            type="text"
            placeholder="Enter institution name"
            value={education.institution}
            onChange={(e) =>
              handleEducationChange(index, 'institution', e.target.value)
            }
            disabled={!editableForms.includes('Education')}
          />
          <label>Degree:</label>
          <input
            type="text"
            placeholder="Enter degree"
            value={education.degree}
            onChange={(e) =>
              handleEducationChange(index, 'degree', e.target.value)
            }
            disabled={!editableForms.includes('Education')}
          />
          <label>Start Date:</label>
          <input
            type="date"
            value={education.startDate}
            onChange={(e) =>
              handleEducationChange(index, 'startDate', e.target.value)
            }
            disabled={!editableForms.includes('Education')}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={education.endDate}
            onChange={(e) =>
              handleEducationChange(index, 'endDate', e.target.value)
            }
            disabled={!editableForms.includes('Education')}
          />
          <div className="inline-buttons">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="remove-icon"
              title="Remove"
            >
              🗑️
            </button>
            <div className="add-button-container">
            <button
              type="button"
              onClick={addEducation}
              className="add-icon"
              title="Add Education"
            >
             Add Education ➕
            </button>
            </div>
          </div>
        </div>
      ))}
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
    </form>
  </div>
)}


        
      </div>
      
    </div>
      
  );
};

export default Home;
