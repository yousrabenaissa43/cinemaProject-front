import React, { useState } from 'react';
import axios from 'axios';

const AddSalle = () => {
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [capacite, setCapacite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleAdd = async () => {
        try {
            await axios.post(`http://localhost:8080/cinemaProject/api/cinema/salle/add?name=${name}&address=${address}&capacite=${capacite}`);
            setSuccessMessage('Salle added successfully!');
            setError('');
        } catch (err) {
            setError('Failed to add salle.');
            setSuccessMessage('');
        }
    };
    
    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Add Salle</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Salle Name"
                style={styles.input}
            />
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Salle Address"
                style={styles.input}
            />
            <input
                type="number"
                value={capacite}
                onChange={(e) => setCapacite(e.target.value)}
                placeholder="Salle Capacity"
                style={styles.input}
            />
            <button onClick={handleAdd} style={styles.button}>Add</button>
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
        backgroundColor: '#f4f4f9',
        borderRadius: '15px', // Border radius for smooth edges
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '40px auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
    },
    formGroup: {
        marginBottom: '15px',
        width: '100%',
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

export default AddSalle;
