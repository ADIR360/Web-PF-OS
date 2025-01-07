import React, { useState } from 'react';
import './GitHubApp.css';
import ArushImage from './Arush.jpg';
import { Star } from 'lucide-react';

const GitHubApp = ({ onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const repositories = [
    {
      name: "IP-Track_Final-with-Updates",
      isPrivate: true,
      description: "Forked from realTNEU/IP-Track",
      language: "JavaScript",
      updatedAt: "3 weeks ago",
      stars: 0
    },
    {
      name: "Portfolio",
      isPrivate: false,
      description: "Personal portfolio project using HTML, CSS, AND JS, provide information about myself",
      language: "HTML",
      updatedAt: "Nov 9",
      stars: 1
    },
    {
      name: "IP-Track",
      isPrivate: true,
      description: "Forked from Akshat-Negi27/IP-Track",
      language: "JavaScript",
      updatedAt: "Nov 9",
      stars: 0
    },
    {
      name: "Lightweight-Go-Network-Scanner",
      isPrivate: false,
      description: "",
      language: "Go",
      updatedAt: "Oct 25",
      stars: 0
    },
    {
      name: "Python-Games",
      isPrivate: false,
      description: "",
      language: "Python",
      updatedAt: "Oct 21",
      stars: 1
    },
    {
      name: "SpeakIdentify---Voice-ID",
      isPrivate: false,
      description: "",
      language: "Python",
      updatedAt: "Oct 14",
      stars: 0
    }
  ];

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      HTML: '#e34c26',
      Python: '#3572A5',
      Go: '#00ADD8'
    };
    return colors[language] || '#858585';
  };

  return (
    <div className={`github-window ${isMaximized ? 'maximized' : ''}`}>
    <div className="GitHub-window-header">
      <h2>GitHub</h2>
      <div className="button-container">
        <button onClick={toggleMaximize}>
          {isMaximized ? 'Restore' : 'Maximize'}
        </button>
        <button onClick={onClose}>❌</button>
      </div>
    </div>
      {/* Rest of the component remains the same */}
      <div className="content">
        <div className="GitHub-profile-container">
          <nav className="GitHub-navbar">
            <h1 className="GitHub-navbar-title">ADIR360</h1>
            <ul className="GitHub-navbar-links">
              <li onClick={() => handlePageChange('overview')}>Overview</li>
              <li onClick={() => handlePageChange('repositories')}>Repositories</li>
            </ul>
          </nav>

          <div className="pages">
            {currentPage === 'overview' && (
              <div className="GitHub-profile-content">
                <div className="GitHub-profile-header">
                  <img
                    className="GitHub-profile-image"
                    src={ArushImage}
                    alt="Profile"
                  />
                  <div className="profile-info">
                    <h2>Arush Dubey</h2>
                    <p>ADIR360 • he/him</p>
                  </div>
                </div>
                <div className="GitHub-gif-section">
                  <img
                    className="GitHub-profile-gif"
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXl2c2EzYjM4Yjg3a2h2dGhpZGh5ejN1YmFlZ3dsemp3MmF4dHE4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FWcoE5AkG3BRe/giphy.gif"
                    alt="GIF"
                    style={{ width: '300px', height: '150px' }}
                  />
                </div>
                <div className="status">
                  <p>
                    I am currently on a break, will not be active much here till
                    after November
                  </p>
                </div>
                <div className="links">
                  <a
                    href="https://www.linkedin.com/in/arush-dubey-358840244/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn linkedin"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.youtube.com/@arushdubey6670"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn youtube"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/arushdubey360/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn instagram"
                  >
                    Instagram
                  </a>
                </div>
                <div className="GitHub-about">
                  <h3>About Me</h3>
                  <p>
                    I'm a passionate Cybersecurity student with hands-on
                    experience in identifying and mitigating various cyber
                    threats.
                  </p>
                  <p>I am a pre-final year B.Tech CSE student specializing in cybersecurity, with expertise in Python, C++, and the MERN stack. I have hands-on experience with tools like Wireshark, Metasploit, Nmap, and kernel-level programming in Go. My projects include a Go-Network-Scanner, an IP Vulnerability Scanner, a facial unlocking system, and a voice recognition system, along with other key tools designed for network and security analysis.

 I'm driven to continuously improve my skills and tackle complex problems. I'm passionate about learning, collaborating, and making meaningful contributions in the cybersecurity space.</p>
                </div>
              </div>
            )}

            {currentPage === 'repositories' && (
              <div className="repository-list">
                <div className="repository-header">
                  <input
                    type="text"
                    placeholder="Find a repository..."
                    className="repository-search"
                  />
                  <div className="repository-filters">
                    <button className="filter-btn">Type</button>
                    <button className="filter-btn">Language</button>
                    <button className="filter-btn">Sort</button>
                    <button className="new-btn">New</button>
                  </div>
                </div>

                <div className="repositories">
                  {repositories.map((repo) => (
                    <div key={repo.name} className="repository-item">
                      <div className="repository-main">
                        <div className="repository-title">
                          <button
                            className="repo-name"
                            onClick={() =>
                              window.open(`https://github.com/ADIR360/${repo.name}`, '_blank')
                            }
                          >
                            {repo.name}
                          </button>
                          <span
                            className={`repo-visibility ${
                              repo.isPrivate ? 'private' : 'public'
                            }`}
                          >
                            {repo.isPrivate ? 'Private' : 'Public'}
                          </span>
                        </div>
                        <p className="repository-description">{repo.description}</p>
                        <div className="repository-meta">
                          {repo.language && (
                            <span className="language">
                              <span
                                className="language-dot"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                              ></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="updated-at">Updated {repo.updatedAt}</span>
                        </div>
                      </div>
                      <div className="repository-stats">
                        <button className="star-button">
                          <Star size={16} />
                          <span>Star</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubApp;