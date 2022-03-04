import React, { useState } from 'react';
import { AppWrap, MotionWrap } from '../../wrapper';
import { StaticImage } from "gatsby-plugin-image";
import { client } from '../../../client';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  }); 
  const { name, email, message } = formData;

  const [isFormSubmitted, setFormIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    if(!name || !email || !message) { 
      setFormError('Please fill all required fields!');
      return false;
    }

    setLoading(true);
    setFormError('');

    const contact = {
      _type: 'contact',
      name,
      email,
      message
    }

    try {
      await client.create(contact);
      setLoading(false);
      setFormIsSubmitted(true);
    } catch(err) {
      console.log(`An Error Occured: ${err}`);
      setLoading(false);
      setFormIsSubmitted(false);
    }

  }

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me!</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <StaticImage src="../../assets/email.png" alt="Email" className="app__footer-card-img" />
          <a href="#" className="p-text">hello@email.com</a>
        </div>
        <div className="app__footer-card">
          <StaticImage src="../../assets/mobile.png" alt="Phone" className="app__footer-card-img" />
          <a href="#" className="p-text">+00 333 222 111</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input 
              className={`p-text ${formError ? 'error' : ''}`}
              type="text" 
              placeholder="Your name" 
              name="name" 
              value={name}
              onChange={handleChangeInput} 
            />
          </div>
          <div className="app__flex">
            <input 
              className={`p-text ${formError ? 'error' : ''}`}
              type="email" 
              placeholder="Your email" 
              name="email" 
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea 
              className={`p-text ${formError ? 'error' : ''}`} 
              placeholder="Your message" 
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          {formError && <p className="app__footer-form-error">{formError}</p>}
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for the message!</h3>
        </div>
      )}
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');