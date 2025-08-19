import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitToGoogleForm as submitFormData } from '../services/googleFormService.js';
// import { submitToDatabase as submitFormData } from '../services/databaseService.js';
// import { submitToLocalStorage as submitFormData } from '../services/localStorageService.js';

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) { return; }

    if (!formData.name || !formData.gender || formData.interests.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitFormData(formData);
      
      if (result.success) {
        navigate('/result', { 
          state: { 
            ...formData, 
            submitted: true,
            message: result.message
          } 
        });
      } else {
        alert(`Submission failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
            disabled={isSubmitting}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>Gender:</label>
          <div>
            {['Male', 'Female', 'Other'].map(gender => (
              <label key={gender} style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleInputChange}
                  style={{ marginRight: '5px' }}
                  disabled={isSubmitting}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>Interests:</label>
          <div>
            {['Sports', 'Music', 'Reading', 'Gaming', 'Cooking', 'Travel'].map(interest => (
              <label key={interest} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleInterestChange}
                  style={{ marginRight: '8px' }}
                  disabled={isSubmitting}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FormPage;