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
        <div className="form-container">
            <h2>Film Details</h2>

            {/* Dropdown list for selecting a film */}
            <div className="form-group">
                <label htmlFor="filmSelect">Select a film:</label>
                <select
                    id="filmSelect"
                    value={selectedFilm}
                    onChange={(e) => setSelectedFilm(e.target.value)}
                    className="form-control"
                >
                    <option value="">Select a film</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.id}>
                            {film.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={fetchFilmDetails} className="form-button">
                View Details
            </button>

            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}

            {/* Display film details */}
            {filmDetails && (
                <div className="film-details">
                    <p><strong>Name:</strong> {filmDetails.name}</p>
                    <p><strong>Description:</strong> {filmDetails.description}</p>
                </div>
            )}
        </div>
    );
};

export default FilmDetails;
