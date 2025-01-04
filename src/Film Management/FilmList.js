import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cinemaProject/api/cinema/films');
                setFilms(response.data);
            } catch (err) {
                setError('Failed to retrieve films.');
            }
        };
        fetchFilms();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Film List</h2>
            {error && <p style={styles.error}>{error}</p>}

            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film) => (
                        <tr key={film.id} style={styles.row}>
                            <td style={styles.td}>{film.id}</td>
                            <td style={styles.td}>{film.name}</td>
                            <td style={styles.td}>{film.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    thead: {
        backgroundColor: '#FFB6C1',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        color: '#fff',
        fontWeight: 'bold',
        borderBottom: '2px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        color: '#333',
        backgroundColor: '#fff',
    },
    row: {
        transition: 'background-color 0.3s ease',
    },
    rowHover: {
        backgroundColor: '#f1f1f1',
    },
    error: {
        color: '#d9534f',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '14px',
    },
};

export default FilmList;
