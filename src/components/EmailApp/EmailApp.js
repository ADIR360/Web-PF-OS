import React, { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon, PauseIcon, SkipForward, SkipBack, 
  Repeat, Shuffle, Volume2, VolumeX,
  Home, Search, Library, PlusSquare, Heart,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './EmailApp.css';
import DailyMix1 from './DailyMix1.png';
import Liked from './Liked.png';
import { FaHeart } from 'react-icons/fa';



// Sample data
const playlists = [

  {
    id: 1,
    title: "Daily Mix 1",
    type: "daily-mix",
    coverUrl: DailyMix1,
    color: "from-blue-700"
  }
];

const recentlyPlayed = [
  {
    id: 1,
    title: "Summer Vibes",
    artist: "Various Artists",
    type: "album",
    coverUrl: Liked
  },
  // Add more items as needed
];

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const audioRef = useRef(new Audio());
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setIsScrolled(mainContentRef.current.scrollTop > 0);
      }
    };

    mainContentRef.current?.addEventListener('scroll', handleScroll);
    return () => mainContentRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const Sidebar = () => (
    <div className="sidebar">
      <div className="nav-group">
        <div className="nav-item">
          <Home size={24} />
          <span className="font-semibold">Home</span>
        </div>
        <div className="nav-item">
          <Search size={24} />
          <span className="font-semibold">Search</span>
        </div>
        <div className="nav-item">
          <Library size={24} />
          <span className="font-semibold">Your Library</span>
        </div>
      </div>

      <div className="playlist-controls">
        <div className="nav-item">
          <PlusSquare size={24} />
          <span className="font-semibold">Create Playlist</span>
        </div>
        <div className="nav-item">
          <FaHeart size={24} className="pink" />
          <span className="font-semibold">Liked Songs</span>
        </div>
      </div>

      <div className="playlist-container">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            <img 
              src={playlist.coverUrl} 
              alt={playlist.title}
              className="playlist-cover"
            />
            <div>
              <div className="playlist-title">{playlist.title}</div>
              <div className="playlist-type">{playlist.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MainContent = () => (
    <div ref={mainContentRef} className="main-content">
      <div className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="nav-buttons">
          <button className="nav-button">
            <ChevronLeft size={24} />
          </button>
          <button className="nav-button">
            <ChevronRight size={24} />
          </button>
        </div>
        <button className="upgrade-button">
          Upgrade
        </button>
      </div>

      <div className="content">
        <section className="section">
          <h2 className="section-title">Good Evening</h2>
          <div className="featured-grid">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`featured-card ${playlist.color}`}
              >
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.title}
                  className="featured-cover"
                />
                <span className="featured-title">{playlist.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Recently Played</h2>
          <div className="album-grid">
            {recentlyPlayed.map((item) => (
              <div key={item.id} className="album-card">
                <img 
                  src={item.coverUrl} 
                  alt={item.title}
                  className="album-cover"
                />
                <h3 className="album-title">{item.title}</h3>
                <p className="album-artist">{item.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const Player = () => (
    <div className="player">
      <div className="player-content">
        <div className="now-playing">
          {currentSong && (
            <div className="song-info">
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title}
                className="song-cover"
              />
              <div>
                <div className="song-title">{currentSong.title}</div>
                <div className="song-artist">{currentSong.artist}</div>
              </div>
              <Heart size={16} className="like-button" />
            </div>
          )}
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button
              className={`control-button ${isShuffled ? 'active' : ''}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle size={20} />
            </button>
            <button className="control-button">
              <SkipBack size={20} />
            </button>
            <button
              className="play-button"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <PauseIcon className="play-icon" size={24} />
              ) : (
                <PlayIcon className="play-icon" size={24} />
              )}
            </button>
            <button className="control-button">
              <SkipForward size={20} />
            </button>
            <button
              className={`control-button ${repeatMode !== 'none' ? 'active' : ''}`}
              onClick={() => {
                setRepeatMode(repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none');
              }}
            >
              <Repeat size={20} />
            </button>
          </div>

          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <div className="progress-bar-container">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="progress-bar"
              />
              <div
                className="progress-bar-fill"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-controls">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="volume-button"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="volume-bar-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-bar"
            />
            <div
              className="volume-bar-fill"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Sidebar />
      <MainContent />
      <Player />
    </div>
  );
};

export default App;