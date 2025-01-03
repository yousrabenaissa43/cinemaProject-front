import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UtilisateurLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/cinemaProject/api/utilisateur/init`,
        null,
        {
          params: { username, password },
        }
      );
      const userId = response.data.userId; 
      navigate(`/reserve-seat?userId=${userId}`);
    } catch (error) {
      setErrorMessage(error.response?.data || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default UtilisateurLogin;
