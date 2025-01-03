import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgramSalle = () => {
    const [salleId, setSalleId] = useState('');
    const [filmId, setFilmId] = useState('');
    const [films, setFilms] = useState([]);
    const [salles, setSalles] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch films and salles when component is mounted
    useEffect(() => {
        const fetchFilmsAndSalles = async () => {
            try {
                const filmResponse = await axios.get('http://localhost:8080/cinemaProject/api/cinema/films');
                const salleResponse = await axios.get('http://localhost:8080/cinemaProject/api/cinema/salles');
                setFilms(filmResponse.data);
                setSalles(salleResponse.data);
            } catch (err) {
                setError('Failed to fetch films or salles.');
                setSuccessMessage('');
            }
        };

        fetchFilmsAndSalles();
    }, []);

    // Handle the programming of salle
    const handleProgram = async () => {
        try {
            await axios.post(`http://localhost:8080/testV2/api/cinema/salle/program?salleId=${salleId}&filmId=${filmId}`);
            setSuccessMessage('Salle programmed successfully!');
            setError('');
        } catch (err) {
            setError('Failed to program salle.'+ salleId);
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Program Salle</h2>

            {/* Dropdown for salle selection */}
            <select
                value={salleId}
                onChange={(e) => setSalleId(e.target.value)}
                style={styles.input}
            >
                <option value="">Select Salle</option>
                {salles.map((salle) => (
                    <option key={salle.id} value={salle.id}>
                        {salle.name}
                    </option>
                ))}
            </select>

            {/* Dropdown for film selection */}
            <select
                value={filmId}
                onChange={(e) => setFilmId(e.target.value)}
                style={styles.input}
            >
                <option value="">Select Film</option>
                {films.map((film) => (
                    <option key={film.id} value={film.id}>
                        {film.name}
                    </option>
                ))}
            </select>

            {/* Program button */}
            <button onClick={handleProgram} style={styles.button}>Program</button>

            {/* Success or error message */}
            {successMessage && <p className="success" style={styles.success}>{successMessage}</p>}
            {error && <p className="error" style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default ProgramSalle;
