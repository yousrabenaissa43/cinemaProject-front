import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Assuming you are using react-router for navigation

const GetAllSeance = () => {
    const [seances, setSeances] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const response = await axios.get("http://localhost:8080/cinemaProject/api/cinema/seances");
                setSeances(response.data);
            } catch (error) {
                setErrorMessage("Failed to load seances. Please try again.");
            }
        };

        fetchSeances();
    }, []);

    // Handle Seance Deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/cinemaProject/api/cinema/seances/${id}`);
            setSeances(seances.filter((seance) => seance.id_seance !== id));
            setErrorMessage("");  // Clear any previous errors
        } catch (error) {
            setErrorMessage("Failed to delete seance. Please try again.");
        }
    };

    // Navigate to Update Seance page
    const handleUpdate = (id) => {
        navigate(`/update-seance/${id}`);  // Assuming a route for updating seance
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>All Seances</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Schedule</th>
                        <th style={styles.th}>Tarif</th>
                        <th style={styles.th}>Available Seats</th>
                        <th style={styles.th}>Places</th>
                        <th style={styles.th}>SalleProg ID</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {seances.map((seance) => (
                        <tr key={seance.id_seance}>
                            <td style={styles.td}>{seance.id_seance}</td>
                            <td style={styles.td}>{seance.horaire}</td>
                            <td style={styles.td}>{seance.tarif}</td>
                            <td style={styles.td}>{seance.availableSeats}</td>
                            <td style={styles.td}>{seance.places}</td>
                            <td style={styles.td}>{seance.salleProg}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleUpdate(seance.id_seance)} style={styles.button}>Update</button>
                                <button onClick={() => handleDelete(seance.id_seance)} style={styles.button}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '8px',  // Rounded borders for the table
        overflow: 'hidden',   // Ensures that the borders are rounded correctly
    },
    th: {
        backgroundColor: '#FFB6C1',  
        color: '#fff',
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    td: {
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
};

export default GetAllSeance;
