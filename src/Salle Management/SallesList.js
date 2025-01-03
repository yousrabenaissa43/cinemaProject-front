import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SallesList = () => {
    const [salles, setSalles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSalles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cinemaProject/api/cinema/salles');  // Get all salles from the backend
                setSalles(response.data);  // Set salles data to state
                setErrorMessage('');  // Clear any previous error message
            } catch (error) {
                setErrorMessage('Failed to load salles. Please try again.');
            }
        };

        fetchSalles();
    }, []);

    // If the salles data is not available yet, display loading message
    if (salles.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>List of Salles</h2>
            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID Salle</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {salles.map((salle) => (
                        <tr key={salle.id_salle}>
                            <td>{salle.id_salle}</td>
                            <td>{salle.name}</td>
                            <td>{salle.address}</td>
                            <td>{salle.capacite}</td>
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
        color: 'white',
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

export default SallesList;
