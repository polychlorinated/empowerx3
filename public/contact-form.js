// Contact form handler
async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Map form fields into the exact JSON object schema n8n expects
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
    goal: formData.get('goal') || '',
    message: formData.get('message'),
    timestamp: new Date().toISOString(),
    source: 'empowerx3.com contact form'
  };
  
  try {
    // Use relative path to eliminate CORS issues
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    
    if (result.success) {
      window.location.href = '/thank-you';
    } else {
      alert('Failed to send message. Please try again or email gary@empowerx3.com directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Failed to send message. Please try again or email gary@empowerx3.com directly.');
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Auto-attach to forms with data-contact-form attribute
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('[data-contact-form]');
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
  });
});