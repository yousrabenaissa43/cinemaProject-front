import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSeance = () => {
    const [schedule, setSchedule] = useState('');
    const [price, setPrice] = useState(0);
    const [seats, setSeats] = useState(0);
    const [hallProgId, setHallProgId] = useState('');
    const [salleProgList, setSalleProgList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSalleProg = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cinemaProject/api/cinema/salleprog');
                setSalleProgList(response.data);
            } catch (error) {
                setErrorMessage(
                    error.response?.data || 'Error fetching salleprog data'
                );
            }
        };
        fetchSalleProg();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formattedSchedule = schedule;
        if (formattedSchedule.length === 16) {
            formattedSchedule += ":00"; 
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/cinemaProject/api/cinema/seances/create?horaire=${encodeURIComponent(formattedSchedule)}&tarif=${price}&places=${seats}&salleProgId=${hallProgId}`
            );
            console.log('Seance created successfully!', response.data);
        } catch (error) {
            setErrorMessage(error.response?.data || 'Error creating seance');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create Seance</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="schedule" style={styles.label}>Schedule:</label>
                    <input
                        type="datetime-local"
                        id="schedule"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="price" style={styles.label}>Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="hallProgId" style={styles.label}>Hall Program:</label>
                    <select
                        id="hallProgId"
                        value={hallProgId}
                        onChange={(e) => setHallProgId(e.target.value)}
                        style={styles.select}
                    >
                        <option value="" disabled>-- Select a Hall Program --</option>
                        {salleProgList.map((salleProg) => (
                            <option key={salleProg.id_salleprog} value={salleProg.id_salleprog}>
                                {`Film: ${salleProg.film.name}, Salle: ${salleProg.salle.name} (${salleProg.salle.capacite} seats)`}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="seats" style={styles.label}>Seats:</label>
                    <input
                        type="number"
                        id="seats"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.button}>Create Seance</button>

                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '24px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '8px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
    },
    select: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        textAlign: 'center',
    },
};

export default CreateSeance;
