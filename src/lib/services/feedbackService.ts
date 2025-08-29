import emailjs from '@emailjs/browser';

interface FeedbackData {
  feedback: string;
  username: string;
  timestamp: string;
  userAgent: string;
  url: string;
  to_email: string;
  [key: string]: string; // Allow any additional string properties for EmailJS
}

export async function submitFeedback(feedback: string, username?: string): Promise<void> {
  const feedbackData: FeedbackData = {
    // Match exactly what your EmailJS template expects
    username: username || 'Anonymous',
    timestamp: new Date().toLocaleString(),
    url: window.location.href,
    feedback: feedback,
    userAgent: navigator.userAgent,
    to_email: import.meta.env.VITE_FEEDBACK_EMAIL || 'michaelzewdie7@gmail.com',
  };

  try {
    // EmailJS configuration - these will be set as environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const feedbackEmail = import.meta.env.VITE_FEEDBACK_EMAIL;


    // Check if all required environment variables are set
    if (!serviceId || !templateId || !publicKey || !feedbackEmail) {
      throw new Error('EmailJS configuration missing. Please check your .env file.');
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    // Send email using EmailJS
    await emailjs.send(
      serviceId,
      templateId,
      feedbackData
    );

    
  } catch (error) {
    console.error('EmailJS Error Details:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('configuration missing')) {
        throw new Error('Email configuration missing. Please check your environment variables.');
      } else if (error.message.includes('Invalid service ID')) {
        throw new Error('Invalid EmailJS Service ID. Please check your configuration.');
      } else if (error.message.includes('Invalid template ID')) {
        throw new Error('Invalid EmailJS Template ID. Please check your configuration.');
      } else if (error.message.includes('Invalid public key')) {
        throw new Error('Invalid EmailJS Public Key. Please check your configuration.');
      }
    }
    
    throw new Error('Failed to submit feedback. Check console for details.');
  }
}