import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateUser = async () => {
    if (!username || !password) {
      setMessage("Username and Password are required.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/cinemaProject/api/utilisateur/create`,
        null,
        {
          params: { username, password },
        }
      );
      if (response.status === 201) {
        setMessage("User created successfully!");
        setIsSuccess(true);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setIsSuccess(false);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      <div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleCreateUser}
          disabled={!username || !password}
          className="create-user-btn"
        >
          Create User
        </button>
      </div>
      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`} aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateUser;
