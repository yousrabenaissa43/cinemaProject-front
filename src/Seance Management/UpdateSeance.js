import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateSeance = () => {
    const { seanceId } = useParams();
    const [seance, setSeance] = useState(null);
    const [schedule, setSchedule] = useState("");
    const [price, setPrice] = useState(0);
    const [seats, setSeats] = useState(0);
    const [hallProgId, setHallProgId] = useState(""); // Initially an empty string
    const [salleProgList, setSalleProgList] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch available hall programs (SalleProg)
    useEffect(() => {
        const fetchSalleProg = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cinemaProject/api/cinema/salleprog');
                setSalleProgList(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data || 'Error fetching salleprog data');
            }
        };
        fetchSalleProg();
    }, []);

    // Fetch current seance details
    useEffect(() => {
        const fetchSeance = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cinemaProject/api/cinema/seances/${seanceId}`);
                const { horaire, tarif, places, salleProg } = response.data;

                // Set the current seance details
                setSeance(response.data);
                setSchedule(horaire);
                setPrice(tarif);
                setSeats(places);
                setHallProgId(salleProg?.id_salleprog || ""); // Ensure it's correctly set
            } catch (error) {
                setErrorMessage("Failed to fetch seance details.");
            }
        };

        fetchSeance();
    }, [seanceId]);

    // Handle the form update submit
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Ensure that schedule is in the correct ISO format with seconds
        let formattedSchedule = schedule;
        if (formattedSchedule.length === 16) {
            formattedSchedule += ":00"; // Add seconds if missing
        }

        // Validate that hallProgId is not empty
        if (!hallProgId) {
            setErrorMessage("Please select a HallProg.");
            return;
        }

        // Send the update via query parameters
        try {
            const response = await axios.put(
                `http://localhost:8080/cinemaProject/api/cinema/seances/${seanceId}?horaire=${encodeURIComponent(formattedSchedule)}&tarif=${price}&places=${seats}&salleProgId=${hallProgId}`
            );
            setSuccessMessage("Seance updated successfully!");
            setErrorMessage("");  // Clear any previous errors
        } catch (error) {
            setErrorMessage("Failed to update the seance.");
            setSuccessMessage(""); // Clear any success messages on error
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Update Seance</h2>
            {seance ? (
                <form onSubmit={handleUpdate} style={styles.form}>
                    <label style={styles.label}>Schedule:</label>
                    <input
                        type="datetime-local"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label style={styles.label}>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label style={styles.label}>Seats:</label>
                    <input
                        type="number"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="hallProgId" style={styles.label}>Hall program details:</label>
                    <select
                        id="hallProgId"
                        value={hallProgId}
                        onChange={(e) => setHallProgId(e.target.value)}
                        style={styles.select}
                    >
                        <option value="" disabled>
                            -- Select a HallProg --
                        </option>
                        {salleProgList.map((salleProg) => (
                            <option key={salleProg.id_salleprog} value={salleProg.id_salleprog}>
                                 {`Film: ${salleProg.film.name} - ${salleProg.film.description} | Salle: ${salleProg.salle.name} - address: ${salleProg.salle.address} seats: ${salleProg.salle.capacite}`}
                            </option>
                        ))}
                    </select>

                    <button type="submit" style={styles.button}>Update Seance</button>
                </form>
            ) : (
                <p>Loading seance details...</p>
            )}

            {successMessage && <p className="success" style={styles.success}>{successMessage}</p>}
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    select: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default UpdateSeance;
