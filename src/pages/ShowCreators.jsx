import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          setError('Failed to load creators');
          console.error('Error fetching creators:', error);
        } else {
          setCreators(data || []);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="show-creators">
        <header>
          <h1>Creatorverse</h1>
          <Link to="/new" className="add-creator-btn">
            Add Creator
          </Link>
        </header>
        
        <div className="loading-message">
          <h2>Loading creators...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="show-creators">
        <header>
          <h1>Creatorverse</h1>
          <Link to="/new" className="add-creator-btn">
            Add Creator
          </Link>
        </header>
        
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="submit-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="show-creators">
      <header>
        <h1>Creatorverse</h1>
        <Link to="/new" className="add-creator-btn">
          Add Creator
        </Link>
      </header>
      
      <div className="creators-container">
        {creators && creators.length > 0 ? (
          creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))
        ) : (
          <div className="empty-state">
            <h2>No creators yet</h2>
            <p>Add some creators to get started!</p>
            <Link to="/new" className="submit-btn">
              Add Your First Creator
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCreators;