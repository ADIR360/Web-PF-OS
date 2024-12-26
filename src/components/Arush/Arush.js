import React, { useState, useEffect } from 'react';
import './Arush.css';
import ArushLogo from './ArushLogo.jpg';
import AruProfile from './aru.png';
import ComputerImage from './computer.gif';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  @keyframes blinkCursor {
    50% {
      border-right-color: transparent;
    }
  }

  @keyframes typeAndDelete {
    0%, 10% {
      width: 0;
    }
    45%, 55% {
      width: 6.2em;
    }
    90%, 100% {
      width: 0;
    }
  }
`;

const AppContainer = styled.div`
  transition: all 300ms ease;
  font-family: 'Poppins', sans-serif;
  background-color: ${props => props.isDarkMode ? '#121212' : '#FFFFFF'};
  color: ${props => props.isDarkMode ? '#FFFFFF' : '#000000'};
`;
const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    setActiveSection(section);
    
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleComputerClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/HomeScreen');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.style.overflow = 'auto';
  }, []);

  const baseStyles = {
    transition: 'all 300ms ease',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  const projects = [
    {
      title: 'Project One',
      github: 'https://github.com/ADIR360/ShoeMatesAssigment1',
      demo: 'https://adir360.github.io/ShoeMatesAssigment1/Sneakers.html',
    },
    {
      title: 'Project Two',
      github: 'https://github.com/ADIR360/Project2',
      demo: 'https://adir360.github.io/Project2',
    },
    {
      title: 'Project Three',
      github: 'https://github.com/ADIR360/Project3',
      demo: 'https://adir360.github.io/Project3',
    },
  ];

  const skills = [
    { title: 'HTML', level: 'Experienced' },
    { title: 'CSS', level: 'Experienced' },
    { title: 'JavaScript', level: 'Intermediate' },
    { title: 'React', level: 'Intermediate' },
    { title: 'Cybersecurity', level: 'Learning' },
  ];

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`} style={baseStyles}>
      <nav className={`nav-container ${isMenuOpen ? 'nav-open' : ''}`}>
        <div className="nav-logo" onClick={scrollToTop}>
          <img
            src={ArushLogo}
            alt="Logo"
            className="logo"
            width="120"
            height="80"
          />
        </div>

        <ul className="desktop-nav">
          <li>
            <button onClick={() => handleNavClick('experience')}>Experience</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('projects')}>Projects</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('contact')}>Contact</button>
          </li>
          <li>
            <input
              type="checkbox"
              id="darkmode-toggle"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="darkmode-input"
            />
            <label htmlFor="darkmode-toggle" className="darkmode-label">
              <div className={`sun ${!isDarkMode ? 'active' : ''}`}>☀️</div>
              <div className={`moon ${isDarkMode ? 'active' : ''}`}>🌙</div>
            </label>
          </li>
        </ul>

        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-inner ${isMenuOpen ? 'is-open' : ''}`}></span>
        </button>

        <ul className={`mobile-nav ${isMenuOpen ? 'show' : ''}`}>
          <li>
            <button onClick={() => handleNavClick('experience')}>Experience</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('projects')}>Projects</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('contact')}>Contact</button>
          </li>
          <li>
            <input
              type="checkbox"
              id="darkmode-toggle-mobile"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="darkmode-input"
            />
            <label htmlFor="darkmode-toggle-mobile" className="darkmode-label">
              <div className={`sun ${!isDarkMode ? 'active' : ''}`}>☀️</div>
              <div className={`moon ${isDarkMode ? 'active' : ''}`}>🌙</div>
            </label>
          </li>
        </ul>
      </nav>

      <section id="profile" className="profile-section">
        <img
          src={AruProfile}
          alt="profile"
          className="profile-image"
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '50%' }}
        />
        <div className="profile-content">
          <p className="intro-text">Hello, I'm</p>
          <h1 className="name">Arush</h1>
          <p className="title">Cybersecurity Student</p>
          <div className="profile-buttons">
            <button onClick={() => window.open('Resume.pdf')} className="btn btn-primary">
              Download CV
            </button>
            <button onClick={() => window.location.href = 'mailto:arushdubey360@gmail.com'} className="btn btn-secondary">
              Contact
            </button>
          </div>
        </div>
      </section>

      <section id="computer" className="computer-section" style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <img 
          src={ComputerImage} 
          alt="Computer" 
          className="computer-image" 
          onClick={handleComputerClick}
          style={{
            maxWidth: '70%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer'
          }}
        />
        {isLoading && (
          <div className="loader" style={{
            marginTop: '20px',
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        )}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </section>

      <section id="experience" className="experience-section" style={{
        opacity: activeSection === 'experience' ? 1 : 0,
        visibility: activeSection === 'experience' ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        position: 'relative'
      }}>
        <h2>Experience</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.title}</h3>
              <p>{skill.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-section" style={{
        opacity: activeSection === 'projects' ? 1 : 0,
        visibility: activeSection === 'projects' ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        position: 'relative'
      }}>
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <div className="project-links">
                <a href={project.github} className="project-link">GitHub</a>
                <a href={project.demo} className="project-link">Live Demo</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section" style={{
        opacity: activeSection === 'contact' ? 1 : 0,
        visibility: activeSection === 'contact' ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        position: 'relative'
      }}>
        <h2>Contact Me</h2>
        <div className="contact-info">
          <a href="mailto:arushdubey360@gmail.com" className="contact-link">
            Email: arushdubey360@gmail.com
          </a>
          <a href="https://linkedin.com/in/arush-dubey-358840244" className="contact-link">
            LinkedIn
          </a>
        </div>
      </section>

      <footer className="footer">
        <ul className="footer-links">
          <li><button onClick={() => handleNavClick('experience')}>Experience</button></li>
          <li><button onClick={() => handleNavClick('projects')}>Projects</button></li>
          <li><button onClick={() => handleNavClick('contact')}>Contact</button></li>
        </ul>
        <p>© 2024 Arush. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;