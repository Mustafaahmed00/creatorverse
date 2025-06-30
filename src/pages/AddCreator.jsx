import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FaPlus, FaYoutube, FaInstagram, FaTiktok, FaTwitch, FaTwitter, FaGlobe } from 'react-icons/fa';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([formData])
        .select();

      if (error) {
        console.error('Error adding creator:', error);
        alert('Error adding creator: ' + error.message);
      } else {
        console.log('Creator added successfully:', data);
        alert('Creator added successfully!');
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="add-creator">
      <h1><FaPlus /> Add New Creator</h1>
      
      <div style={{
        backgroundColor: '#e7f3ff',
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0056b3'
      }}>
        📝 Fill out the form below and click "✅ Add Creator" to save your new creator!
      </div>
      
      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Creator Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., MrBeast, PewDiePie, Ninja"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel URL *</label>
          <div style={{ marginBottom: '10px', fontSize: '0.9em', color: '#666' }}>
            <FaYoutube style={{ color: '#ff0000', marginRight: '5px' }} />
            <FaInstagram style={{ color: '#e4405f', marginRight: '5px' }} />
            <FaTiktok style={{ color: '#000000', marginRight: '5px' }} />
            <FaTwitch style={{ color: '#9146ff', marginRight: '5px' }} />
            <FaTwitter style={{ color: '#1da1f2', marginRight: '5px' }} />
            <FaGlobe style={{ color: '#007bff' }} />
            Supported platforms: YouTube, Instagram, TikTok, Twitch, Twitter/X, and more!
          </div>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://www.youtube.com/@MrBeast"
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
            placeholder="Describe what type of content they create, their style, why you like them..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Profile Image URL (optional)</label>
          <div style={{ 
            marginBottom: '10px', 
            fontSize: '0.9em', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #dee2e6'
          }}>
            💡 <strong>How to get a working image URL:</strong><br/>
            • Right-click on their profile picture and select "Copy image address"<br/>
            • Make sure the URL ends with .jpg, .png, .gif, or .webp<br/>
            • Test the URL by pasting it in a new browser tab<br/>
            • If the image doesn't load, try a different image source
          </div>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/profile-image.jpg (optional)"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '3px solid #0056b3',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '15px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              display: 'inline-block',
              minWidth: '180px',
              height: '50px'
            }}
          >
            ✅ Add Creator
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="cancel-btn"
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '3px solid #545b62',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '15px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              display: 'inline-block',
              minWidth: '180px',
              height: '50px'
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;