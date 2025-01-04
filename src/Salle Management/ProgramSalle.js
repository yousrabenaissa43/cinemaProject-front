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
            await axios.post(`http://localhost:8080/cinemaProject/api/cinema/salle/program?salleId=${salleId}&filmId=${filmId}`);
            setSuccessMessage('Salle programmed successfully!');
            setError('');
        } catch (err) {
            setError('Failed to program salle.' + salleId);
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
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f9', // Light background color
        borderRadius: '15px', // Rounded corners for a smooth look
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
        maxWidth: '500px', // Maximum width for the container
        margin: '40px auto', // Centering the form on the page
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        marginBottom: '15px', // Space between inputs
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#87ceeb', // Sky blue color for the button
        color: '#fff',
        border: 'none',
        borderRadius: '8px', // Smooth edges for the button
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        transition: 'background-color 0.3s ease', // Transition effect on hover
    },
    success: {
        color: '#5cb85c', // Green for success
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
    error: {
        color: '#d9534f', // Red for error
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
};

export default ProgramSalle;
