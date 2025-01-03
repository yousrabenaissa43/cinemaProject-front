import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteSeance = () => {
    const { seanceId } = useParams(); // Retrieve the seance ID from the URL parameters
    const [seance, setSeance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate  = useNavigate();

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
                    <p>
                        <strong>Seance ID:</strong> {seance.id_seance}
                    </p>
                    <p>
                        <strong>Film:</strong> {seance.salleProg?.film?.name || "Unknown Film"}
                    </p>
                    <p>
                        <strong>Schedule:</strong> {seance.horaire}
                    </p>

                    <button onClick={handleDelete} style={styles.button}>Delete Seance</button>
                </div>
            ) : (
                <p>Loading seance details...</p>
            )}

            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
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
    details: {
        textAlign: 'left',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default DeleteSeance;
