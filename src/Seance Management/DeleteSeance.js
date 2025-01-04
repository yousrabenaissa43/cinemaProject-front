import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteSeance = () => {
    const { seanceId } = useParams(); // Retrieve the seance ID from the URL parameters
    const [seance, setSeance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeance = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cinemaProject/api/cinema/seances/${seanceId}`);
                setSeance(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch seance details.");
            }
        };

        fetchSeance();
    }, [seanceId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/cinemaProject/api/cinema/seances/${seanceId}`);
            setErrorMessage("");
            navigate("/seances");  // Redirect after deleting
        } catch (error) {
            setErrorMessage("Failed to delete seance.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Delete Seance</h2>
            {seance ? (
                <div style={styles.details}>
                    <p style={styles.text}>
                        <strong>Seance ID:</strong> {seance.id_seance}
                    </p>
                    <p style={styles.text}>
                        <strong>Film:</strong> {seance.salleProg?.film?.name || "Unknown Film"}
                    </p>
                    <p style={styles.text}>
                        <strong>Schedule:</strong> {seance.horaire}
                    </p>

                    <button onClick={handleDelete} style={styles.button}>Delete Seance</button>
                </div>
            ) : (
                <p>Loading seance details...</p>
            )}

            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '30px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    text: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#333',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#ff4747',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#e63946',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '15px',
        textAlign: 'center',
    },
};

export default DeleteSeance;
