import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const inputClasses = `w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500 transition-colors duration-200
                        ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-160px)] flex flex-col items-center py-12 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-lg w-full max-w-2xl`}>
        <h2 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>Contact Us</h2>
        <p className={`text-lg text-center mb-6 ${textColor}`}>We'd love to hear from you! Please fill out the form below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${textColor}`}>Your Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textColor}`}>Your Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${textColor}`}>Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} required />
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-medium mb-2 ${textColor}`}>Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className={inputClasses} required></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <p className="mt-4 text-center text-green-600">Your message has been sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-center text-red-600">Failed to send message. Please try again.</p>
          )}
        </form>

        <div className={`mt-10 pt-6 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} text-center ${textColor}`}>
          <h3 className={`text-2xl font-semibold mb-4 ${textColor}`}>Other Ways to Reach Us</h3>
          <p className="mb-2"><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> support@growsery.com</p>
          <p className="mb-2"><span className="font-semibold">Address:</span> 123 Fresh Foods Lane, Green City, GC 12345</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
