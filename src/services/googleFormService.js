const GOOGLE_FORM_CONFIG = {
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSduI0H6SufAuVNmsDKURCJixyG_jhzJ6A30mgLmYeofuKkz5w/formResponse',
  fieldIds: {
    name: 'entry.2110379342',
    gender: 'entry.998982829',
    interests: 'entry.1538790123'
  }
};

export const submitToGoogleForm = async (data) => {
  const formData = new FormData();
  
  formData.append(GOOGLE_FORM_CONFIG.fieldIds.name, data.name);
  formData.append(GOOGLE_FORM_CONFIG.fieldIds.gender, data.gender);
  
  data.interests.forEach(interest => {
    formData.append(GOOGLE_FORM_CONFIG.fieldIds.interests, interest);
  });

  try {
    await fetch(GOOGLE_FORM_CONFIG.url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    return { 
      success: true, 
      message: 'Data submitted to Google Forms successfully'
    };
  } catch (error) {
    console.error('Error submitting to Google Form:', error);
    return { 
      success: false, 
      message: 'Failed to submit to Google Forms'
    };
  }
};