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
        <h2 style={styles.header}>Film List </h2>
        {error && <p className="error">{error}</p>}
        <table style={styles.table}>

        
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film) => (
                        <tr key={film.id}>
                            <td>{film.id}</td>
                            <td>{film.name}</td>
                            <td>{film.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        border: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default FilmList;
