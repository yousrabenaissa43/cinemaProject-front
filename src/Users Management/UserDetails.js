import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReserveSeat = () => {
  const location = useLocation();

  // Utility function to get query parameters
  const getQueryParam = (param) => {
    const urlSearchParams = new URLSearchParams(location.search);
    return urlSearchParams.get(param);
  };

  const userId = getQueryParam('userId');
  const [seances, setSeances] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8080/cinemaProject/api/cinema/seances'
        );
        setSeances(data);
      } catch (error) {
        setErrorMessage('Failed to load seances. Please try again later.');
      }
    };

    fetchSeances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSeance) {
      setErrorMessage('Please select a seance.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/cinemaProject/api/cinema/seances/reserve`,
        null,
        {
          params: { seance_id: selectedSeance, user_id: userId },
        }
      );
      setSuccessMessage('Seat reserved successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to reserve seat. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reserve a Seat</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Dropdown list for selecting a seance */}
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="seanceSelect" style={styles.label}>
            Select a Seance:
          </label>
          <select
            id="seanceSelect"
            aria-label="Seance Selection"
            value={selectedSeance}
            onChange={(e) => setSelectedSeance(e.target.value)}
            style={styles.select}
          >
            <option value="" disabled>
              Select a Seance
            </option>
            {seances.map((seance) => (
              <option key={seance.id_seance} value={seance.id_seance}>
                {`Seance ID: ${seance.id_seance}, Film: ${
                  seance.salleProg?.film?.name || 'Unknown'
                }, Time: ${seance.horaire}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          aria-label="Reserve Seat"
          style={styles.submitButton}
        >
          Reserve Seat
        </button>
      </form>

      {/* Messages */}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  formGroup: {
    textAlign: 'left',
  },
  label: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
    display: 'block',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
  successMessage: {
    color: '#28a745',
    fontWeight: '600',
    marginTop: '20px',
  },
  errorMessage: {
    color: '#dc3545',
    fontWeight: '600',
    marginTop: '20px',
  },
};

export default ReserveSeat;
