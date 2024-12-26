import React, { useState, useEffect, useRef } from 'react';
import './DynamicIsland.css';

const DynamicIsland = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const progressBarRef = useRef(null);

  // Viewport check with debouncing
  useEffect(() => {
    let timeoutId;
    const checkViewport = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 150);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  // Audio setup
  useEffect(() => {
    const newAudio = new Audio(require('./Stranger.mp3'));
    setAudio(newAudio);

    newAudio.addEventListener('loadedmetadata', () => setDuration(newAudio.duration));
    return () => {
      newAudio.pause();
      newAudio.remove();
    };
  }, []);

  // Time update handler
  useEffect(() => {
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      updateProgressBar(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audio]);

  const updateProgressBar = (time) => {
    if (progressBarRef.current) {
      const progress = (time / duration) * 100;
      progressBarRef.current.style.setProperty('--progress', `${progress}%`);
    }
  };

  const handleDesktopInteraction = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMobileInteraction = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    e.stopPropagation();
    if (!audio) return;
    
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    updateProgressBar(newTime);
  };

  return (
    <div
      className={`dynamic-island ${isHovered ? 'hovered' : ''} 
                 ${isMobile ? 'mobile' : 'desktop'} 
                 ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleDesktopInteraction}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMobileInteraction}
    >
      {(isHovered || isExpanded) && (
        <div className="media-player">
          <div className="track-info">
            <h3>Strangers</h3>
            <p>{isPlaying ? 'Playing' : 'Paused'}</p>
          </div>
          <div className="controls">
            <button
              className="control-button"
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
          <div className="progress-bar">
            <input
              ref={progressBarRef}
              type="range"
              className="progress-3"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleProgressChange}
              min="0"
              max="100"
              style={{
                background: `linear-gradient(to right, 
                  #f03355 ${(currentTime / duration) * 100}%, 
                  #2c2c2c ${(currentTime / duration) * 100}%)`,
              }}
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicIsland;