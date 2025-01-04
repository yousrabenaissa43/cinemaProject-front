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
        <div style={styles.container}>
            <h2 style={styles.header}>Update Film</h2>

            {/* Dropdown list for selecting a film */}
            <div style={styles.formGroup}>
                <label htmlFor="filmSelect" style={styles.label}>Select a film:</label>
                <select
                    id="filmSelect"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>Select Film ID</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.id}>
                            {film.id} - {film.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Input for updating film name */}
            <div style={styles.formGroup}>
                <label htmlFor="filmName" style={styles.label}>Film Name:</label>
                <input
                    id="filmName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    placeholder="Film Name"
                />
            </div>

            {/* Textarea for updating film description */}
            <div style={styles.formGroup}>
                <label htmlFor="filmDescription" style={styles.label}>Film Description:</label>
                <textarea
                    id="filmDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textarea}
                    placeholder="Film Description"
                />
            </div>

            {/* Submit button */}
            <button onClick={handleUpdate} style={styles.button}>
                Update
            </button>

            {/* Success or error message */}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '15px', // Border radius for smooth edges
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        minHeight: '100px',
    },
    button: {
        backgroundColor: '#87ceeb', // Sky blue (beau ciel)
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#77b3cc', // A slightly darker shade of blue for hover effect
    },
    success: {
        color: 'green',
        textAlign: 'center',
        fontSize: '16px',
        marginTop: '15px',
    },
    error: {
        color: '#d9534f',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
};

export default UpdateFilm;
