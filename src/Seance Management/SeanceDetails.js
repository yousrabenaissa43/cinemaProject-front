import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeanceDetails = () => {
    const { seanceId } = useParams(); 
    const [seance, setSeance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchSeanceDetails = async () => {
            try {
                const seanceId = 1 ;
                const response = await axios.get(`http://localhost:8080/cinemaProject/api/cinema/seances/${seanceId}`);
                setSeance(response.data); 
                setErrorMessage(""); 
            } catch (error) {
                setErrorMessage("Failed to load seance details.");
            }
        };

        fetchSeanceDetails();
    }, [seanceId]);  
   
    if (!seance) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Seance Details</h2>
            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
            <div style={styles.details}>
                <p><strong>Seance ID:</strong> {seance.id_seance}</p>
                <p><strong>Available Seats:</strong> {seance.availableSeats}</p>
                <p><strong>Total Seats:</strong> {seance.places}</p>
                <p><strong>Schedule:</strong> {new Date(seance.horaire).toLocaleString()}</p>
                <p><strong>Ticket Price:</strong> ${seance.tarif}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',  // Increased border-radius for a smoother look
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',  // Slightly increased box-shadow intensity
        transition: 'box-shadow 0.3s ease-in-out',  // Added transition for smooth effect
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',  // Changed header text color for better contrast
    },
    details: {
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',  // Adding rounded corners for better UI
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        backgroundColor: '#ffe6e6',  // Changed background color for error messages for better readability
        padding: '10px',
        borderRadius: '5px',  // Rounded edges for error message box
    },
};


export default SeanceDetails;
