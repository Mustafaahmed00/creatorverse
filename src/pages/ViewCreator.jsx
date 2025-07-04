import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FaYoutube, FaInstagram, FaTiktok, FaTwitch, FaTwitter, FaGlobe, FaUser, FaEdit, FaTrash } from 'react-icons/fa';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitFeedback, setVisitFeedback] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          setError('Failed to load creator details');
          console.error('Error fetching creator:', error);
        } else {
          setCreator(data);
          setFormData({
            name: data.name || '',
            url: data.url || '',
            description: data.description || '',
            imageURL: data.imageURL || ''
          });
          // Reset image states when creator data changes
          setImageError(false);
          setImageLoading(true);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [id]);

  const handleVisitChannel = () => {
    setVisitFeedback('Opening channel in new tab...');
    setTimeout(() => setVisitFeedback(''), 2000);
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

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage('');
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      name: creator.name || '',
      url: creator.url || '',
      description: creator.description || '',
      imageURL: creator.imageURL || ''
    });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id)
        .select();

      if (error) {
        setError('Failed to update creator: ' + error.message);
        console.error('Error updating creator:', error);
      } else {
        setSuccessMessage('Creator updated successfully!');
        setCreator(data[0]); // Update the displayed creator data
        setIsEditing(false);
        console.log('Creator updated:', data);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this creator? This action cannot be undone.');
    
    if (confirmDelete) {
      try {
        setDeleting(true);
        setError(null);
        
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) {
          setError('Failed to delete creator: ' + error.message);
          console.error('Error deleting creator:', error);
        } else {
          setSuccessMessage('Creator deleted successfully!');
          console.log('Creator deleted');
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', err);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="view-creator">
        <div className="loading-message">
          <h2>Loading creator details...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error && !creator) {
    return (
      <div className="view-creator">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="submit-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="view-creator">
        <Link to="/" className="back-btn">← Back to Home</Link>
        <div className="error-message">
          <h2>Creator Not Found</h2>
          <p>The creator you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-creator">
      <Link to="/" className="back-btn">← Back to Home</Link>
      
      {successMessage && (
        <div className="feedback-message success">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="feedback-message error">
          {error}
        </div>
      )}
      
      <div className="creator-details">
        {isEditing ? (
          // Edit Form
          <form onSubmit={handleSubmit} className="creator-form">
            <h1>Edit Creator</h1>
            
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter creator's name"
                disabled={saving || deleting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">Channel URL *</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://..."
                disabled={saving || deleting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe their content..."
                rows="4"
                disabled={saving || deleting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageURL">Image URL (optional)</label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="https://... (optional)"
                disabled={saving || deleting}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={saving || deleting}
              >
                {saving ? '⏳ Updating...' : '✅ Update Creator'}
              </button>
              <button 
                type="button" 
                onClick={handleCancel} 
                className="cancel-btn"
                disabled={saving || deleting}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        ) : (
          // View Mode
          <>
            <div className="creator-header">
              <h1>{creator.name}</h1>
              <div className="platform-info-large">
                {getPlatformIcon(creator.url)}
                <span className="platform-name">{getPlatformName(creator.url)}</span>
              </div>
            </div>
            
            <div className="image-container-large">
              {creator.imageURL && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="image-loading-large">
                      <div className="loading-spinner"></div>
                      <span>Loading image...</span>
                    </div>
                  )}
                  <img 
                    src={creator.imageURL} 
                    alt={creator.name} 
                    className="creator-image-large"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                </>
              ) : (
                <div className="placeholder-image-large">
                  <FaUser className="placeholder-icon-large" />
                  <span>No Image Available</span>
                </div>
              )}
            </div>
            
            <p className="creator-description">{creator.description}</p>
            
            <div className="channel-link-section">
              <a 
                href={creator.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="creator-link-large"
                onClick={handleVisitChannel}
              >
                {getPlatformIcon(creator.url)}
                Visit {creator.name}'s {getPlatformName(creator.url)}
              </a>
              {visitFeedback && (
                <div className="feedback-message success">
                  {visitFeedback}
                </div>
              )}
            </div>
            
            <div className="action-buttons">
              <button 
                onClick={handleEdit} 
                className="edit-btn"
                disabled={saving || deleting}
              >
                <FaEdit /> Edit Creator
              </button>
              <button 
                onClick={handleDelete} 
                className="delete-btn"
                disabled={saving || deleting}
              >
                <FaTrash /> {deleting ? 'Deleting...' : 'Delete Creator'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCreator;