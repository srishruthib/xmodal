import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    dateofbirth: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const VailedEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const ValidPhoneNumber = (phonenumber) => {
    return /^\d{10}$/.test(phonenumber);
  };

  const VailedDOB = (dateofbirth) => {
    const today = new Date();
    const dob = new Date(dateofbirth);
    return dob <= today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, dateofbirth, phonenumber } = formData;

    if (!VailedEmail(email)) {
      alert('Invalid email id. Please enter a valid email address.');
      return;
    }

    if (!VailedDOB(dateofbirth)) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    if (!ValidPhoneNumber(phonenumber)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    
    alert('Form submitted successfully!');
    console.log('Form submitted');
  };

  return (
    <div id="root" style={{ position: 'relative', minHeight: '100vh' }}>
      {!open && (
        <button onClick={() => setOpen(true)}>Open Form</button>
      )}

      {open && (
        <div
          className="modal"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px'
            }}
          >
            <h1>User Details Modal</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>User Name:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="User Name"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />

                <label>Email Address:</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />

                <label>Phone Number:</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phonenumber}
                  required
                />

                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  value={formData.dateofbirth}
                  required
                />

                <button
                  type="submit"
                  className="submit-button"
                  style={{ marginTop: '20px' }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;