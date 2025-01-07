import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Arush.css';
import Arushpicture from './aru.png';
import emailpic from './Email.png';
import phonepic from './Phone.png';
import localpic from './Location.png';
import cybersec from './cybersec.jpg';
import webdev from './webdev.png';
import softdev from './SoftwareDev.jpg';
import aiml from './aiml.png';
import prjone from './Home-PJ1.png';
import prjtwo from './PJ2.png';
import prjthree from './PJ3.png';
import prjfour from './PJ4.png';
import computerGif from './computer.gif';

const ResponsiveNavbar = ({ handleComputerClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const MobileNavbar = () => (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'inherit' }}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="navbar-link" data-nav-link>Resume</button>
        </li>
        <li className="navbar-item">
          <button onClick={handleComputerClick} className="navbar-link">My Computer</button>
        </li>
        <li className="navbar-item">
          <a href="https://medium.com/@arushdubeystudent" className="navbar-link">Blog</a>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" data-nav-link>Contact</button>
        </li>
      </ul>
    </nav>
  );

  const DesktopNavbar = () => (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="navbar-link" data-nav-link>Resume</button>
        </li>
        <li className="navbar-item">
          <button onClick={handleComputerClick} className="navbar-link">My Computer</button>
        </li>
        <li className="navbar-item">
          <a href="https://medium.com/@arushdubeystudent" className="navbar-link">Blog</a>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" data-nav-link>Contact</button>
        </li>
      </ul>
    </nav>
  );

  return windowWidth <= 768 ? <MobileNavbar /> : <DesktopNavbar />;
};

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleComputerClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/HomeScreen');
    }, 4000);
  };

  if (isLoading) {
    return (
      <div className="loader-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d1117'
      }}>
        <img src={computerGif} alt="Loading..." style={{
          maxWidth: '300px',
          maxHeight: '300px'
        }} />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <main style={{ height: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <aside className="sidebar" data-sidebar style={{ position: 'sticky', top: 0 }}>
          <div className="sidebar-info">
            <figure className="avatar-box">
              <img src={Arushpicture} alt="Arush Dubey" width="70" />
            </figure>
            <div className="info-content">
              <h1 className="name" title="Arush Dubey">Arush Dubey</h1>
              <p className="title">Student and Web Developer</p>
            </div>
            <button className="info_more-btn" data-sidebar-btn>
              <span>Show Contacts</span>
            </button>
          </div>
          <div className="sidebar-info_more">
            <div className="separator"></div>
            <ul className="contacts-list">
              <li className="contact-item">
                <div className="Email-icon-box">
                  <img src={emailpic} alt="Email" width="25" />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Email</p>
                  <a href="mailto:arushdubey360@gmail.com" className="contact-link">arushdubey360@gmail.com</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="Phone-icon-box">
                  <img src={phonepic} alt="Phone" width="25" />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Phone</p>
                  <a href="tel:+918279453655" className="contact-link">+91 8279453655</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="Location-icon-box">
                  <img src={localpic} alt="Location" width="25" />
                </div>
                <div className="contact-info">
                  <p className="contact-title">Location</p>
                  <address>DehraDun, Uttrakhand, India</address>
                </div>
              </li>
            </ul>
            <div className="separator"></div>
            <ul className="social-list">
              <li className="social-item">
                <a href="https://www.linkedin.com/in/arush-dubey-358840244/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              <li className="social-item">
                <a href="https://x.com/Corush93659933" className="social-link" target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li className="social-item">
                <a href="https://www.instagram.com/arushdubey360/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div className="main-content" style={{ minHeight: 'min-content' }}>
          <ResponsiveNavbar handleComputerClick={handleComputerClick} />

          <article className="about active" data-page="about">
            <header>
              <h2 className="h2 article-title">About Me</h2>
            </header>
            <section className="about-text">
              <p>
                I am a pre-final year B.Tech CSE student specializing in cybersecurity, with expertise in Python, C++, and the MERN stack. I have hands-on experience with tools like Wireshark, Metasploit, Nmap, and kernel-level programming in Go.
              </p>
            </section>

            <section className="service">
              <h3 className="h3 service-title">What I'm Doing</h3>
              <ul className="service-list">
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src={webdev} alt="Web Development" width="130" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Web Design</h4>
                    <p className="service-item-text">Modern and high-quality design created professionally.</p>
                  </div>
                </li>
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src={cybersec} alt="Cyber Security" width="130" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Cyber Security</h4>
                    <p className="service-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src={softdev} alt="Software Development" width="130" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Software Development</h4>
                    <p className="service-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src={aiml} alt="AI/ML" width="130" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">AI/ML</h4>
                    <p className="service-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="testimonials">
              <h3 className="h3 testimonials-title">Projects</h3>
              <ul className="testimonials-list">
                <li className="tt-item">
                  <div className="tt-icon-box">
                    <img src={prjone} alt="Project One" width="100" />
                  </div>
                  <div className="tt-content-box">
                    <h4 className="tt-item-title">IP Vul Scanner</h4>
                    <p className="tt-item-text">Web Based URL Scanner that scans and tell vulberabilities in a website</p>
                  </div>
                </li>
                <li className="tt-item">
                  <div className="tt-icon-box">
                    <img src={prjtwo} alt="Project Two" width="100" />
                  </div>
                  <div className="tt-content-box">
                    <h4 className="tt-item-title">AI/ML</h4>
                    <p className="tt-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
                <li className="tt-item">
                  <div className="tt-icon-box">
                    <img src={prjthree} alt="Project Three" width="100" />
                  </div>
                  <div className="tt-content-box">
                    <h4 className="tt-item-title">AI/ML</h4>
                    <p className="tt-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
                <li className="tt-item">
                  <div className="tt-icon-box">
                    <img src={prjfour} alt="Project Four" width="100" />
                  </div>
                  <div className="tt-content-box">
                    <h4 className="tt-item-title">AI/ML</h4>
                    <p className="tt-item-text">High-quality site development at a professional level.</p>
                  </div>
                </li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;