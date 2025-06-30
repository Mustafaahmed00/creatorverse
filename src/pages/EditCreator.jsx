import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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
        } else if (data) {
          setFormData({
            name: data.name || '',
            url: data.url || '',
            description: data.description || '',
            imageURL: data.imageURL || ''
          });
        } else {
          setError('Creator not found');
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous error messages when user starts typing
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
        console.log('Creator updated:', data);
        
        // Show success message for 2 seconds then redirect
        setTimeout(() => {
          navigate(`/creator/${id}`);
        }, 2000);
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
          
          // Show success message for 2 seconds then redirect
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
      <div className="edit-creator">
        <div className="loading-message">
          <h2>Loading creator details...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="edit-creator">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="submit-btn">
            Try Again
          </button>
          <button onClick={() => navigate('/')} className="cancel-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-creator">
      <h1>Edit Creator</h1>
      
      <div style={{
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#856404'
      }}>
        ✏️ Make your changes below and click "✅ Update Creator" to save, or "🗑️ Delete Creator" to remove!
      </div>
      
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
      
      <form onSubmit={handleSubmit} className="creator-form">
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
            className={`submit-btn ${saving ? 'disabled' : ''}`}
            disabled={saving || deleting}
          >
            {saving ? '⏳ Updating...' : '✅ Update Creator'}
          </button>
          
          <button 
            type="button" 
            className="cancel-btn"
            disabled={saving || deleting}
            onClick={() => navigate(`/creator/${id}`)}
          >
            ❌ Cancel
          </button>
          
          <button 
            type="button" 
            className={`delete-btn ${deleting ? 'disabled' : ''}`}
            disabled={saving || deleting}
            onClick={handleDelete}
          >
            {deleting ? '⏳ Deleting...' : '🗑️ Delete Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;