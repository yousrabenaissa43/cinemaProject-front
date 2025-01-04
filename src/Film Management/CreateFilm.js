import React, { useState } from 'react';
import axios from 'axios';

const CreateFilm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const createFilm = async () => {
        try {
            await axios.post(
                `http://localhost:8080/cinemaProject/api/cinema/createFilm?name=${name}&description=${description}`
            );
            setSuccessMessage('Film created successfully!');
            setError('');
        } catch (err) {
            setError('Failed to create film.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create New Film</h2>
            <div style={styles.formGroup}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Film Name"
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Film Description"
                    style={styles.textarea}
                />
            </div>
            <button onClick={createFilm} style={styles.button}>
                Create
            </button>
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
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
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        height: '100px',
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
    success: {
        color: '#5cb85c',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
    error: {
        color: '#d9534f',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '15px',
    },
};

export default CreateFilm;
