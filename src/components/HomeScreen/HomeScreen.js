import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import DynamicIsland from '../DynamicIsland/DynamicIsland';
import GitHubApp from '../GitHubApp/GitHubApp';
import EmailApp from '../EmailApp/EmailApp';
import desktopBackground from './videoplayback.gif';
import mobileBackground from './background.jpg';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const [isGitHubAppVisible, setGitHubAppVisible] = useState(false);
  const [isEmailAppVisible, setEmailAppVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBackground = () => {
    return windowSize.width <= 768 ? mobileBackground : desktopBackground;
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetch(
        `https://api.duckduckgo.com/?q=${searchQuery}&format=json&pretty=1&no_redirect=1&no_html=1&skip_disambig=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.RelatedTopics) {
            setSuggestions(
              data.RelatedTopics.map((topic) => topic.Text).slice(0, 5)
            );
          }
        })
        .catch((error) => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(suggestion)}`, '_blank');
  };

  const toggleGitHubApp = () => {
    setGitHubAppVisible(!isGitHubAppVisible);
  };

  const toggleEmailApp = () => {
    setEmailAppVisible(!isEmailAppVisible);
  };

  const handleMouseMove = (e) => {
    if (e.clientY > windowSize.height - 100) {
      setShowIcons(true);
    } else {
      setShowIcons(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [windowSize.height]);

  return (
    <div className="home-screen">
      <div 
        className="background-image"
        style={{ backgroundImage: `url(${getBackground()})` }}
      />
      
      <input
        type="text"
        className="search-bar"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-list visible">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <DynamicIsland />

      <div className={`icon-container ${showIcons ? 'visible' : ''}`}>
        <div className="icon email-icon" onClick={toggleEmailApp} />
        <div className="icon insta-icon" onClick={() => window.open('https://www.instagram.com', '_blank')} />
        <div className="icon github-icon" onClick={toggleGitHubApp} />
        <div className="icon linkedin-icon" onClick={() => window.open('https://www.linkedin.com', '_blank')} />
        <div className="icon rubiks-cube-icon" onClick={() => navigate('/RubiksCube')} />
      </div>

      {isGitHubAppVisible && (
        <>
          <div className="github-app-overlay" onClick={toggleGitHubApp} />
          <GitHubApp onClose={toggleGitHubApp} />
        </>
      )}

      {isEmailAppVisible && (
        <>
          <div className="email-app-overlay" onClick={toggleEmailApp} />
          <EmailApp onClose={toggleEmailApp} />
        </>
      )}
    </div>
  );
};

export default HomeScreen;