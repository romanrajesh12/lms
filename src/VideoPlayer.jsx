import { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const MAX_DURATION = 60; // seconds

    const handleEnded = () => {
      setIsPlaying(false);
      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    const updateTime = () => {
      const limit = Math.min(video.duration || MAX_DURATION, MAX_DURATION);
      if (video.currentTime >= limit) {
        video.currentTime = limit;
        video.pause();
        handleEnded();
      }
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      // Show 1 minute as total duration (or real duration if shorter)
      const limit = Math.min(video.duration || MAX_DURATION, MAX_DURATION);
      setDuration(limit);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [onVideoEnd]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="custom-video"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          preload="metadata"
          controls={false}
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="video-controls">
          <button 
            className="play-pause-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="video-instructions">
        <p>Watch the video completely to unlock the Post-Test.</p>
        <p className="video-status">
          {duration > 0 && currentTime >= duration - 0.5 
            ? '✓ Video completed! You can now proceed to the Post-Test.' 
            : 'Video in progress...'}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;

