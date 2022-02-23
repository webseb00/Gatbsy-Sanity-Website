import React from 'react';
import { About, Footer, Header, Skills, Work, Testimonials } from '../container/index';
import { Navbar } from '../components/index';
import '../index.css';
import '../App.scss';

const IndexPage = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default IndexPage;