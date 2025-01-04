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
        return <p style={styles.loading}>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>List of Salles</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID Salle</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {salles.map((salle) => (
                        <tr key={salle.id_salle}>
                            <td style={styles.td}>{salle.id_salle}</td>
                            <td style={styles.td}>{salle.name}</td>
                            <td style={styles.td}>{salle.address}</td>
                            <td style={styles.td}>{salle.capacite}</td>
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
        backgroundColor: '#f4f4f9', // Light background color
        borderRadius: '15px', // Rounded corners for a smooth look
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
        maxWidth: '800px', // Maximum width for the container
        margin: '40px auto', // Centering the table on the page
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#FFB6C1', // Blue header color
        color: 'white',
        padding: '12px 20px', // Padding for header
        border: '1px solid #ddd', // Border for cells
        fontSize: '16px', // Larger font size
    },
    td: {
        padding: '12px 20px', // Padding for cells
        border: '1px solid #ddd', // Border for cells
        textAlign: 'center', // Center the text
        fontSize: '14px', // Slightly smaller font size
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
    },
};

export default SallesList;
