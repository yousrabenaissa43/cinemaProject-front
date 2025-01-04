import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmDetails = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState('');
  const [filmDetails, setFilmDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch the list of films when the component is mounted
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cinemaProject/api/cinema/films');
        setFilms(response.data);
      } catch (err) {
        setError('Failed to fetch films.');
      }
    };

    fetchFilms();
  }, []);

  const fetchFilmDetails = async () => {
    if (!selectedFilm) {
      setError('Please select a film to view details.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/cinemaProject/api/cinema/films/${selectedFilm}`);
      setFilmDetails(response.data);
      setSuccessMessage('Film details retrieved successfully!');
      setError('');
    } catch (err) {
      setError('Failed to fetch film details.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Film Details</h2>

      {/* Dropdown list for selecting a film */}
      <div style={styles.formGroup}>
        <label htmlFor="filmSelect" style={styles.label}>Select a film:</label>
        <select
          id="filmSelect"
          value={selectedFilm}
          onChange={(e) => setSelectedFilm(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a film</option>
          {films.map((film) => (
            <option key={film.id} value={film.id}>
              {film.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={fetchFilmDetails} style={styles.button}>
        View Details
      </button>

      {successMessage && <p style={styles.success}>{successMessage}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display film details */}
      {filmDetails && (
        <div style={styles.filmDetails}>
          <p><strong>Name:</strong> {filmDetails.name}</p>
          <p><strong>Description:</strong> {filmDetails.description}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0275d8',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  success: {
    marginTop: '15px',
    color: '#5cb85c',
    textAlign: 'center',
    fontSize: '14px',
  },
  error: {
    marginTop: '15px',
    color: '#d9534f',
    textAlign: 'center',
    fontSize: '14px',
  },
  filmDetails: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
};

export default FilmDetails;
