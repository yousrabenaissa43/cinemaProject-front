import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFilm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [films, setFilms] = useState([]);

    useEffect(() => {
        // Fetch the list of films from the server
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

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:8080/cinemaProject/api/cinema/films/${id}?id=${id}&filmName=${name}&filmDescription=${description}`
            );
            setSuccessMessage('Film updated successfully!');
            setError('');
        } catch (err) {
            setError('Failed to update film.');
            setSuccessMessage('');
        }
    };

    return (
<div className="form-container">
    <h2>Update Film</h2>

    {/* Dropdown list for selecting a film */}
    <div className="form-group">
        <label htmlFor="filmSelect">Select a film:</label>
        <select
            id="filmSelect"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="form-control" // Utilise la classe CSS partagée
        >
            <option value="" disabled>
                Select Film ID
            </option>
            {films.map((film) => (
                <option key={film.id} value={film.id}>
                    {film.id} - {film.name}
                </option>
            ))}
        </select>
    </div>

    {/* Input for updating film name */}
    <div className="form-group">
        <label htmlFor="filmName">Film Name:</label>
        <input
            id="filmName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Film Name"
        />
    </div>

    {/* Textarea for updating film description */}
    <div className="form-group">
        <label htmlFor="filmDescription">Film Description:</label>
        <textarea
            id="filmDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Film Description"
        />
    </div>

    {/* Submit button */}
    <button onClick={handleUpdate} >
        Update
    </button>






      
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default UpdateFilm;
