import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  // If no data is passed, redirect back to form
  if (!formData) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
        <h2>No Data Found</h2>
        <p>Please fill out the form first.</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2>Form Submission Results</h2>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        color: '#000'
      }}>
        <h3>Submitted Information:</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Name:</strong> {formData.name}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Gender:</strong> {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
        </div>
        
        <div style={{ marginBottom: '15px'}}>
          <strong>Interests:</strong>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            {formData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Back to Form
      </button>
    </div>
  );
};

export default ResultPage;