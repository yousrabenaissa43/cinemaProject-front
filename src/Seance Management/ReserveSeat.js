import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReserveSeat = () => {
  const location = useLocation();
  const getQueryParam = (param) => {
    const urlSearchParams = new URLSearchParams(location.search);
    return urlSearchParams.get(param);
  };
  const userId = getQueryParam("userId");
  const [seances, setSeances] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const seanceResponse = await axios.get(
          'http://localhost:8080/cinemaProject/api/cinema/seances'
        );
        setSeances(seanceResponse.data);
      } catch {
        setErrorMessage('Failed to load seances.');
      }
    };

    fetchSeances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/cinemaProject/api/cinema/seances/reserve?seance_id=${selectedSeance}&user_id=${userId}`);
      setSuccessMessage('Seat reserved successfully!');
      setErrorMessage('');
    } catch {
      setErrorMessage('Failed to reserve seat.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reserve a Seat</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Dropdown list for selecting a seance */}
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="seanceSelect" style={styles.label}>Select a Seance:</label>
          <select
            id="seanceSelect"
            value={selectedSeance}
            onChange={(e) => setSelectedSeance(e.target.value)}
            style={styles.select} 
          >
            <option value="" disabled>Select a Seance</option>
            {seances.map((seance) => (
              <option key={seance.id_seance} value={seance.id_seance}>
                {`Seance ID: ${seance.id_seance}, Horaire: ${seance.horaire}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" style={styles.submitButton}>
          Reserve Seat
        </button>
      </form>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: 'auto',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#333',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ReserveSeat;
