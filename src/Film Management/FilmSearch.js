import React, { useState } from 'react';
import axios from 'axios';

const FilmSearch = () => {
    const [pattern, setPattern] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cinemaProject/api/cinema/films/search?pattern=${pattern}`);
            setResults(response.data);
        } catch (err) {
            setError('Failed to search films.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Search Films</h2>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="Enter pattern"
                    style={styles.input}
                />
            </div>
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>

            {error && <p style={styles.error}>{error}</p>}
            <ul style={styles.list}>
                {results.map((film) => (
                    <li key={film.id} style={styles.listItem}>
                        {film.name}: {film.description}
                    </li>
                ))}
            </ul>
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
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
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
    error: {
        color: '#d9534f',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        backgroundColor: '#f9f9f9',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export default FilmSearch;
