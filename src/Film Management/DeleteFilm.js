import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteFilm = () => {
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState('');
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

    const handleDelete = async () => {
        if (!selectedFilm) {
            setError('Please select a film to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:8080/testV2/api/cinema/film/${selectedFilm}`);
            setSuccessMessage(response.data);
            setError('');
        } catch (err) {
            setError('Failed to delete film.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <h2>Delete Film</h2>

            {/* Dropdown list for selecting a film */}
            <div className="form-group">
                <label htmlFor="filmSelect">Select a film:</label>
                <select
                    id="filmSelect"
                    value={selectedFilm}
                    onChange={(e) => setSelectedFilm(e.target.value)}
                    className="form-control" // Utilise la classe CSS partagée
                >
                    <option value="">Select a film</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.id}>
                            {film.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleDelete} >
                Delete
            </button>

            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DeleteFilm;
