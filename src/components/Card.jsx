import { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  const [visitFeedback, setVisitFeedback] = useState('');

  const handleVisitChannel = () => {
    setVisitFeedback('Opening channel...');
    setTimeout(() => setVisitFeedback(''), 1500);
  };

  return (
    <div className="creator-card">
      <h3>{creator.name}</h3>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className="creator-image" />
      )}
      <p>{creator.description}</p>
      
      <div className="channel-link-section">
        <a 
          href={creator.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="creator-link"
          onClick={handleVisitChannel}
        >
          Visit Channel
        </a>
        {visitFeedback && (
          <div className="feedback-message success small">
            {visitFeedback}
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <Link to={`/creator/${creator.id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;