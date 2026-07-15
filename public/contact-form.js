// Contact form handler
async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
    const response = await fetch('https://empowerx3.andrew-3db.workers.dev/api/contact', {
      method: 'POST',
      body: formData,
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