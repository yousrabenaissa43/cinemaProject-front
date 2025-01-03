import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReserveSeat = () => {
  const [seances, setSeances] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

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
        `http://localhost:8080/cinemaProject/api/cinema/seances/reserve`,
        null,
        {
          params: {
            seance_id: selectedSeance,
            user_id: userId,
          },
        }
      );
      setSuccessMessage('Seat reserved successfully!');
      setErrorMessage('');
    } catch {
      setErrorMessage('Failed to reserve seat.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
    <h2>Reserve a Seat</h2>

    {/* Dropdown list for selecting a seance */}
    <div className="form-group">
        <label htmlFor="seanceSelect">Select a Seance:</label>
        <select
            id="seanceSelect"
            value={selectedSeance}
            onChange={(e) => setSelectedSeance(e.target.value)}
            className="form-control" // Utilise la classe CSS partagée
        >
            <option value="" disabled>
                Select a Seance
            </option>
            {seances.map((seance) => (
                <option key={seance.id_seance} value={seance.id_seance}>
                    {`Seance ID: ${seance.id_seance}, Film: ${seance.salleProg?.film?.name || 'Unknown'}, Horaire: ${seance.horaire}`}
                </option>
            ))}
        </select>
    </div>

    {/* Submit button */}
    <button onClick={handleSubmit} >
        Reserve Seat
    </button>


      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ReserveSeat;
