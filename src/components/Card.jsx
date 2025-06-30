import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaTiktok, FaTwitch, FaTwitter, FaGlobe, FaUser } from 'react-icons/fa';

const Card = ({ creator }) => {
  const [visitFeedback, setVisitFeedback] = useState('');
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleVisitChannel = () => {
    setVisitFeedback('Opening channel...');
    setTimeout(() => setVisitFeedback(''), 1500);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  // Function to detect platform and return appropriate icon
  const getPlatformIcon = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      return <FaYoutube className="platform-icon youtube" />;
    } else if (lowerUrl.includes('instagram.com')) {
      return <FaInstagram className="platform-icon instagram" />;
    } else if (lowerUrl.includes('tiktok.com')) {
      return <FaTiktok className="platform-icon tiktok" />;
    } else if (lowerUrl.includes('twitch.tv')) {
      return <FaTwitch className="platform-icon twitch" />;
    } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
      return <FaTwitter className="platform-icon twitter" />;
    } else {
      return <FaGlobe className="platform-icon globe" />;
    }
  };

  // Function to get platform name
  const getPlatformName = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      return 'YouTube';
    } else if (lowerUrl.includes('instagram.com')) {
      return 'Instagram';
    } else if (lowerUrl.includes('tiktok.com')) {
      return 'TikTok';
    } else if (lowerUrl.includes('twitch.tv')) {
      return 'Twitch';
    } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
      return 'Twitter/X';
    } else {
      return 'Website';
    }
  };

  return (
    <div className="creator-card">
      <div className="card-header">
        <h3>{creator.name}</h3>
        <div className="platform-info">
          {getPlatformIcon(creator.url)}
          <span className="platform-name">{getPlatformName(creator.url)}</span>
        </div>
      </div>
      
      <div className="image-container">
        {creator.imageURL && !imageError ? (
          <>
            {imageLoading && (
              <div className="image-loading">
                <div className="loading-spinner"></div>
                <span>Loading image...</span>
              </div>
            )}
            <img 
              src={creator.imageURL} 
              alt={creator.name} 
              className="creator-image"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          </>
        ) : (
          <div className="placeholder-image">
            <FaUser className="placeholder-icon" />
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <p className="creator-description">{creator.description}</p>
      
      <div className="channel-link-section">
        <a 
          href={creator.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="creator-link"
          onClick={handleVisitChannel}
        >
          {getPlatformIcon(creator.url)}
          Visit {getPlatformName(creator.url)}
        </a>
        {visitFeedback && (
          <div className="feedback-message success small">
            {visitFeedback}
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <Link to={`/creator/${creator.id}`} className="view-btn">
          👁️ View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;